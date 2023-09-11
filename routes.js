"use strict";

const express = require("express");
const router = express.Router();
const utils = require("./src/utils.js");

router.get("/", (req, res) => {
    let data = {
        title: "Index",
        today: new Date(),
    };

    res.render("index.ejs", data);
});

router.get("/login", (req, res) => {
    let data = {
        title: "Pulse | Login",
        login: "",
        user: "",
    };

    res.render("login.ejs", data);
});

router.post("/login", (req, res) => {
    let user = req.body.user;
    let password = req.body.pass;

    if (utils.checkCredentials(user, password)) {
        res.redirect("/");
    }

    console.log("Wrong credentials");

    let data = {
        title: "Pulse | Login",
        login: "wrong",
        user: user,
    };

    res.render("login.ejs", data);
});

module.exports = router;
