"use-strict";

/**
 * Renders the login page
 * @param {object} req contains information
 * @param {object} res where to render
 */
function renderLogin(req, res) {
    res.render("login.ejs", {
        title: "Pulse | Login",
        login: "",
        user: "",
    });
}

/**
 * Renders the admin dashboard
 * @param {object} req contains information
 * @param {object} res where to render
 */
function renderDashboard(req, res) {
    res.render("index.ejs", {
        title: "Pulse | Dashboard",
        user: req.firstname,
    });
}

/**
 * Renders the user dashboard
 * @param {object} req contains information
 * @param {object} res where to render
 */
function renderDashboardUser(req, res) {
    res.render("index.ejs", {
        title: "Pulse | Dashboard",
        user: req.firstname,
    });
}

/**
 * Renders the upload page
 * @param {object} req contains information
 * @param {object} res where to render
 * @param {string} upload upload status
 * @param {string} message message to be displayed
 */
function renderUpload(req, res, upload, message) {
    res.render("upload.ejs", {
        title: "Pulse | Upload users",
        upload: upload,
        message: message,
        user: req.firstname,
    });
}

/**
 * Renders the project page
 * @param {object} req contains information
 * @param {object} res where to render
 */
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
