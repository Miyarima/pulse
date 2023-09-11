"use strict";

const express = require("express");
const router = express.Router();
// const utils = require('./src/utils.js');

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
    };

    res.render("login.ejs", data);
});

router.post("/login", (req, res) => {
    let data = req.params;

    console.log(data);

    res.redirect("/");
});

module.exports = router;
