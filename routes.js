"use strict";

const express = require("express");
const router = express.Router();
// const utils = require('./src/utils.js');

router.get("/", (req, res) => {
    let data = {
        title: "Index",
        today: new Date()
    };

    res.render("index.ejs", data);
});

module.exports = router;
