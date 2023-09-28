"use strict";

const csv = require("./src/parseCsv.js");
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");
const multer = require("multer");
const express = require("express");

const loginAuth = require("./src/loginAuth.js");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

const rend = require("./src/renders.js");

router.get("/", async (req, res) => {
    rend.renderLogin(req, res);
});

router.post("/", async (req, res) => {
    await loginAuth.checkCredentials(req, res);
});

router.post("/logout", cookieJwtAuth("user"), (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

router.get("/dashboard", cookieJwtAuth("admin"), (req, res) => {
    rend.renderDashboard(req, res);
});

router.get("/dashboard/user", cookieJwtAuth("user"), (req, res) => {
    rend.renderDashboardUser(req, res);
});

router.get("/upload", cookieJwtAuth("admin"), (req, res) => {
    rend.renderUpload(req, res, "", "");
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
    rend.renderProject(req, res);
});

router.post("/project", cookieJwtAuth("admin"), (req, res) => {
    rend.renderProject(req, res);
    console.log(req.body);
});

router.use((req, res) => {
    res.status(404).render("404.ejs", {
        title: "Pulse | Page not Found",
    });
});

module.exports = router;
