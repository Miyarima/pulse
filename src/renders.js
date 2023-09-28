"use-strict";

const db = require("./users.js");

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
        user: `${req.firstname} ${req.lastname}`,
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
        user: `${req.firstname} ${req.lastname}`,
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
        user: `${req.firstname} ${req.lastname}`,
    });
}

/**
 * Renders the project page
 * @param {object} req contains information
 * @param {object} res where to render
 */
async function renderProject(req, res) {
    let projectName = "";

    if (req.body.project_name) {
        projectName = req.body.project_name;
    }

    const teamMembers = await db.getSpecificUsers("user");

    res.render("project.ejs", {
        title: "Pulse | Create projects",
        user: `${req.firstname} ${req.lastname}`,
        project: projectName,
        team: teamMembers,
    });
}

module.exports = {
    renderLogin,
    renderDashboard,
    renderUpload,
    renderProject,
    renderDashboardUser,
};
