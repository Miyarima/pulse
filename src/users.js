"use-strict";

const knex = require("../db/knex.js");

function createUser(user) {
    return knex("users").insert(user);
}

function getAllUsers() {
    return knex("users").select("*");
}

function getSpecificUsers(users) {
    return knex("users")
        .where("role", users)
        .select("firstname", "lastname")
        .orderBy("firstname", "asc");
}

function getUser(email) {
    return knex("users").where("email", email);
}

function getEmployeeId(user) {
    return knex("users")
        .where("firstname", user.firstname)
        .where("lastname", user.lastname)
        .select("employeeid");
}

function getProjectId(project, employee) {
    return knex("projects")
        .where("project_name", project)
        .where("employeeid", employee)
        .select("id");
}

function createProject(project) {
    return knex("projects")
        .insert(project)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error("Error executing query:", error);
            throw error;
        });
}

function createReport(report) {
    return knex("reports")
        .insert(report)
        .then((result) => {
            return result;
        })
        .catch((error) => {
            console.error("Error executing query:", error);
            throw error;
        });
}

function getReports(employeeId) {
    return knex
        .select(
            "reports.id as report_id",
            "projects.project_name",
            "reports.report_text",
            "reports.report_date",
        )
        .from("reports")
        .join("projects", "reports.project_id", "projects.id")
        .join("users", "reports.employee_id", "users.employeeid")
        .where("employee_id", employeeId);
}

function getAllReports() {
    return knex
        .select(
            "projects.project_name",
            "reports.id as report_id",
            "report_text",
            "report_date",
            "report_updated",
            "firstname",
            "lastname",
        )
        .from("reports")
        .join("users", "reports.employee_id", "users.employeeid")
        .join("projects", "reports.project_id", "projects.id");
}

function getReportText(reportId) {
    return knex
        .select("report_text")
        .from("reports")
        .join("users", "reports.employee_id", "users.employeeid")
        .join("projects", "reports.project_id", "projects.id")
        .where("reports.id", reportId);
}

// function deleteUser(id) {
//     return knex("users").where("id", id).del();
// }

function getUserWithString(email, string) {
    return knex("users").where("email", email).where("first", string);
}

function updateUserPassword(email, string, update) {
    return knex("users")
        .where("email", email)
        .where("first", string)
        .update(update);
}

function updateUserReport(reportId, update) {
    update.report_updated = knex.raw("CURRENT_TIMESTAMP");
    return knex("reports").where("id", reportId).update(update);
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    getSpecificUsers,
    createProject,
    getEmployeeId,
    createReport,
    getProjectId,
    getReports,
    updateUserPassword,
    getUserWithString,
    updateUserReport,
    getAllReports,
    getReportText,
};
