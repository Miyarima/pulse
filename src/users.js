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
            "reports.report_comment",
        )
        .from("reports")
        .join("projects", "reports.project_id", "projects.id")
        .join("users", "reports.employee_id", "users.employeeid")
        .where("employee_id", employeeId)
        .orderBy("report_date", "asc");
}

function getAllReports() {
    return knex
        .select(
            "projects.project_name",
            "reports.id as report_id",
            "report_text",
            "report_date",
            "report_updated",
            "report_marked",
            "firstname",
            "lastname",
        )
        .from("reports")
        .join("users", "reports.employee_id", "users.employeeid")
        .join("projects", "reports.project_id", "projects.id")
        .orderBy("report_updated", "desc")
        .orderBy("report_date", "desc");
}

function getReportText(reportId) {
    return knex
        .select("report_text", "report_comment")
        .from("reports")
        .join("users", "reports.employee_id", "users.employeeid")
        .join("projects", "reports.project_id", "projects.id")
        .where("reports.id", reportId);
}

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

function addUserReportComment(reportId, comment) {
    return knex("reports").where("id", reportId).update(comment);
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
    addUserReportComment,
};
