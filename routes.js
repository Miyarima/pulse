"use strict";

const express = require("express");
const router = express.Router();
const loginAuth = require("./src/loginAuth.js");
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");
// const users = require("./db/users.js");

// const bcrypt = require("bcrypt");
// const password = "password";
// const hash = await bcrypt.hash(password, 10);
// console.log(hash);

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
        title: "Index",
    };

    res.render("index.ejs", data);
});

router.get("/upload", cookieJwtAuth("admin"), (req, res) => {
    let data = {
        title: "Upload users",
    };

    res.render("upload.ejs", data);
});

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
