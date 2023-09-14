"use strict";

const express = require("express");
const router = express.Router();
const loginAuth = require("./src/loginAuth.js");
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
    let data = {
        title: "Pulse | Login",
        login: "",
        user: "",
    };

    res.render("login.ejs", data);
});

router.post("/", async (req, res) => {
    await loginAuth.checkCredentials(req, res);
});

router.get("/dashboard", cookieJwtAuth("admin"), (req, res) => {
    let data = {
        title: "Dashboard",
    };

    res.render("index.ejs", data);
});

router.get("/upload", cookieJwtAuth("admin"), (req, res) => {
    let data = {
        title: "Upload users",
        upload: "",
    };

    res.render("upload.ejs", data);
});

router.post(
    "/upload",
    cookieJwtAuth("admin"),
    upload.single("csvFile"),
    (req, res) => {
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
                // console.log(results);
                res.render("upload.ejs", {
                    title: "Upload users",
                    upload: results.length,
                });
            });
    },
);

router.get("/project", cookieJwtAuth("admin"), (req, res) => {
    let data = {
        title: "Create projects",
    };

    res.render("project.ejs", data);
});

router.use((req, res) => {
    res.status(404).render("404.ejs", {
        title: "Pulse | Page not Found",
    });
});

module.exports = router;
