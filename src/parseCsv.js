"use-strict";

const csv = require("csv-parser");
const fs = require("fs");
const db = require("./users.js");
const bcrypt = require("bcrypt");

const addUsersToDb = (users) => {
    users.forEach(async (e) => {
        const password = "password";
        const hash = await bcrypt.hash(password, 10);

        const newUser = {
            firstname: e.firstname,
            lastname: e.lastname,
            employeeid: e.employeeid,
            address: e.address,
            number: e.number,
            email: e.email,
            password: hash,
            role: e.role,
        };

        const alreadyExsist = await db.getUser(e.email);

        if (!alreadyExsist[0]) {
            db.createUser(newUser)
                .then((result) => {
                    console.log("User inserted successfully:", result);
                })
                .catch((error) => {
                    console.error("Error inserting user:", error);
                });
        }
    });
};

const parseCsv = (req, res) => {
    if (!req.file) {
        return res.render("upload.ejs", {
            title: "Upload users",
            upload: "failed",
        });
    }

    const csvFilePath = req.file.path;
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", () => {
            addUsersToDb(results);
            res.render("upload.ejs", {
                title: "Upload users",
                upload: results.length,
            });
        });
};

module.exports = parseCsv;
