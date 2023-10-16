"use-strict";

const db = require("./users.js");
const format = require("./userReports.js");

/**
 * Creats an array with the names
 * @param {array} names an array with objects containing people
 * @returns an array with the names
 */
function parseNames(names) {
    if (typeof names === "string") {
        const nameParts = names.split(" ");
        return [
            {
                firstname: nameParts[0],
                lastname: nameParts[1],
            },
        ];
    }

    const nameList = [];

    for (const fullName of names) {
        const nameParts = fullName.split(" ");

        if (nameParts.length >= 2) {
            const nameObject = {
                firstname: nameParts[0],
                lastname: nameParts.slice(1).join(" "),
            };

            nameList.push(nameObject);
        }
    }

    return nameList;
}

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
async function renderDashboard(req, res) {
    let reports = await db.getAllReports();

    reports = format.formatAllReports(reports);

    res.render("index.ejs", {
        title: "Pulse | Dashboard",
        user: `${req.firstname} ${req.lastname}`,
        reports: reports,
    });
}

/**
 * Renders the user dashboard
 * @param {object} req contains information
 * @param {object} res where to render
 */
async function renderDashboardUser(req, res) {
    const employeeId = await db.getEmployeeId({
        firstname: req.firstname,
        lastname: req.lastname,
    });

    let reports = await db.getReports(employeeId[0].employeeid);

    reports = format.formatReports(reports);

    res.render("user-dashboard.ejs", {
        title: "Pulse | Dashboard",
        user: `${req.firstname} ${req.lastname}`,
        reports: reports,
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
    let users;

    if (upload !== "" && upload !== "failed") {
        users = upload;
    }

    res.render("upload.ejs", {
        title: "Pulse | Upload users",
        upload: upload,
        email: users,
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
    let startDate = "";
    let endDate = "";
    let frequency = "";
    let teamCount = 0;
    let parsed;

    if (req.body.team_members) {
        parsed = parseNames(req.body.team_members).length;
    }

    if (req.body.project_name) {
        projectName = req.body.project_name;
        startDate = req.body.start_date;
        endDate = req.body.end_date;
        frequency = req.body.report_frequency;
        teamCount = parsed;
    }

    const teamMembers = await db.getSpecificUsers("user");

    res.render("project.ejs", {
        title: "Pulse | Create projects",
        user: `${req.firstname} ${req.lastname}`,
        project: projectName,
        startDate: startDate,
        endDate: endDate,
        frequency: frequency,
        count: teamCount,
        team: teamMembers,
    });
}

/**
 * Renders the setup page
 * @param {object} req contains information
 * @param {object} res where to render
 */
function renderSetup(req, res) {
    res.render("setup.ejs", {
        title: "Pulse | Set up Account",
        password: "",
        email: req.params.email,
    });
}

/**
 * Renders the edit report page
 * @param {object} req contains information
 * @param {object} res where to render
 */
function renderEditReport(req, res) {
    res.render("edit-report.ejs", {
        title: "Pulse | Edit your report",
        user: `${req.firstname} ${req.lastname}`,
        project_name: req.params.project,
        report_date: req.params.date,
        project_id: req.params.id,
    });
}

/**
 * Renders the view report page
 * @param {object} req contains information
 * @param {object} res where to render
 */
async function renderViewReport(req, res) {
    const text = await db.getReportText(req.params.id);

    res.render("view-report.ejs", {
        title: "Pulse | View report",
        user: `${req.firstname} ${req.lastname}`,
        project_name: req.params.project,
        report_date: req.params.date,
        project_id: req.params.id,
        name: req.params.name,
        text: text[0].report_text,
        read: req.query.read ? "yes" : "no",
    });
}

module.exports = {
    renderLogin,
    renderDashboard,
    renderUpload,
    renderProject,
    renderDashboardUser,
    renderSetup,
    renderEditReport,
    renderViewReport,
};
