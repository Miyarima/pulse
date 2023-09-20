"use-strict";

function renderLogin(req, res) {
    res.render("login.ejs", {
        title: "Pulse | Login",
        login: "",
        user: "",
    });
}

function renderDashboard(req, res) {
    res.render("index.ejs", {
        title: "Pulse | Dashboard",
        user: req.firstname,
    });
}

function renderDashboardUser(req, res) {
    res.render("index.ejs", {
        title: "Pulse | Dashboard",
        user: req.firstname,
    });
}

function renderUpload(req, res, upload, message) {
    res.render("upload.ejs", {
        title: "Pulse | Upload users",
        upload: upload,
        message: message,
        user: req.firstname,
    });
}

function renderProject(req, res) {
    res.render("project.ejs", {
        title: "Pulse | Create projects",
        user: req.firstname,
    });
}

module.exports = {
    renderLogin,
    renderDashboard,
    renderUpload,
    renderProject,
    renderDashboardUser,
};
