"use strict";

const express = require("express");
const router = express.Router();
const utils = require("./src/utils.js");
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
    let user = req.body.user;
    let password = req.body.pass;

    const checked = await utils.checkCredentials(user, password);

    if (checked) {
        return res.redirect("/dashboard");
    }

    res.render("login.ejs", {
        title: "Pulse | Login",
        login: "wrong",
        user: user,
    });
});

router.get("/dashboard", (req, res) => {
    let data = {
        title: "Index",
    };

    res.render("index.ejs", data);
});

router.use((req, res) => {
    res.status(404).render("404.ejs", {
        title: "Pulse | Page not Found",
    });
});

module.exports = router;
