"use strict";

const csv = require("./src/parseCsv.js");
const addReports = require("./src/reports.js");
const cookieJwtAuth = require("./middleware/cookieJwtAuth.js");
const multer = require("multer");
const express = require("express");

const loginAuth = require("./src/loginAuth.js");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const password = require("./src/password.js");
const rend = require("./src/renders.js");
const update = require("./src/update-report.js");

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
    addReports(req.body);
    rend.renderProject(req, res);
});

router.get("/setup/:email/:string", (req, res) => {
    rend.renderSetup(req, res);
});

router.post("/setup/:email/:string", (req, res) => {
    password(req, res);
});

router.get(
    "/report/edit/:project/:date/:id",
    cookieJwtAuth("user"),
    (req, res) => {
        rend.renderEditReport(req, res);
    },
);

router.post(
    "/report/edit/:project/:date/:id",
    cookieJwtAuth("user"),
    (req, res) => {
        update.updateReportText(req);
        res.redirect("/dashboard/user");
    },
);

router.get(
    "/report/view/:project/:date/:name/:id",
    cookieJwtAuth("admin"),
    (req, res) => {
        rend.renderViewReport(req, res);
    },
);

router.post(
    "/report/view/:project/:date/:name/:id",
    cookieJwtAuth("admin"),
    (req, res) => {
        update.updateReportReadStatus(req);
        res.redirect("/dashboard");
    },
);

router.use((req, res) => {
    res.status(404).render("404.ejs", {
        title: "Pulse | Page not Found",
    });
});

module.exports = router;
