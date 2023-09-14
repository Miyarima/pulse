"use strict";

const csv = require("./src/parseCsv.js");
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");
const multer = require("multer");
const express = require("express");

const loginAuth = require("./src/loginAuth.js");
const router = express.Router();
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

router.get("/dashboard/user", cookieJwtAuth("user"), (req, res) => {
    let data = {
        title: "Dashboard",
    };

    res.render("index.ejs", data);
});

router.get("/upload", cookieJwtAuth("admin"), (req, res) => {
    let data = {
        title: "Upload users",
        upload: "",
        exsisted: "",
    };

    res.render("upload.ejs", data);
});

router.post(
    "/upload",
    cookieJwtAuth("admin"),
    upload.single("csvFile"),
    (req, res) => {
        csv(req, res);
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
