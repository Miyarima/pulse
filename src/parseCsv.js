"use-strict";

const csv = require("csv-parser");
const fs = require("fs");
const db = require("./users.js");
const bcrypt = require("bcrypt");
const path = require("path");
const upload = require("./renders.js").renderUpload;
// const mail = require("./mail.js");
const rand = require("crypto");

/**
 * Adds all users in the array to the database
 * @param {Array} users all users
 */
const addUsersToDb = async (users) => {
    let inserts = [];
    for (const e of users) {
        const password = rand.randomBytes(64).toString("hex");
        const hash = await bcrypt.hash(password, 10);
        const string = rand.randomBytes(64).toString("hex");

        const newUser = {
            firstname: e.firstname,
            lastname: e.lastname,
            employeeid: e.employeeid,
            address: e.address,
            number: e.number,
            email: e.email,
            password: hash,
            role: e.role,
            first: string,
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

            // if (e.email === "jogo19@student.bth.se") {
            //     mail(e.email, string);
            // }

            inserts.push({
                firstname: e.firstname,
                lastname: e.lastname,
                email: e.email,
            });
        }
    }

    return inserts;
};

/**
 * Check if the file is CSV
 * @param {object} file the file to be checked
 * @returns either true or false
 */
const fileFilter = (file) => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname === ".csv") {
        return true;
    }
    return false;
};

/**
 * If a file was sent, the data will be parsed and pushed to an array
 * @param {object} req contains the file
 * @param {object} res where to load the page
 * @returns If no files was uploaded
 */
const parseCsv = (req, res) => {
    if (!req.file) {
        return upload(
            req,
            res,
            "failed",
            "Something went wrong and nothing has been uploaded",
        );
    }

    const fileFilterResult = fileFilter(req.file);
    const csvFilePath = req.file.path;
    const results = [];

    if (!fileFilterResult) {
        return upload(req, res, "failed", "Please only upload CSV files");
    }

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", async () => {
            const insert = await addUsersToDb(results);
            upload(req, res, insert, "");
        });
};

module.exports = parseCsv;
