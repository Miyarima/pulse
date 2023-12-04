"use-strict";

const db = require("./users.js");

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

    const nameList1 = [];

    for (const fullName of names) {
        const nameParts = fullName.split(" ");

        if (nameParts.length >= 2) {
            const nameObject = {
                firstname: nameParts[0],
                lastname: nameParts.slice(1).join(" "),
            };

            nameList1.push(nameObject);
        }
    }

    return nameList1;
}

/**
 * Adds an employee to a proejct
 * @param {array} project all information surrounding the project
 * @param {int} employeeId id of the employee
 */
function addProject(project, employeeId) {
    db.createProject({
        project_name: project.project_name,
        employeeid: employeeId,
        start_date: project.start_date,
        end_date: project.end_date,
    });
}

/**
 * Adds a report for the employee
 * @param {int} projectId id of the project
 * @param {int} employeeId id of the employee
 * @param {date} endDate due date for the report
 */
function addReport(projectId, employeeId, endDate) {
    db.createReport({
        project_id: projectId,
        employee_id: employeeId,
        report_text: "nothing added",
        report_date: endDate,
    });
}

/**
 * Creats an array with repoting dates, adhearing to the frequency
 * @param {date} startDate begining of the project
 * @param {date} endDate end of the project
 * @param {date} frequency report frequency
 * @returns an array with all dates of reports
 */
function generateReportDates(startDate, endDate, frequency) {
    const dateList = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    console.log(frequency);

    while (currentDate.getTime() <= end.getTime()) {
        if (
            frequency === "daily" &&
            currentDate.getDay() !== 0 &&
            currentDate.getDay() !== 6
        ) {
            dateList.push(new Date(currentDate));
        } else if (
            frequency === "weekly" ||
            frequency === "monthly" ||
            frequency === "fortnightly"
        ) {
            dateList.push(new Date(currentDate));
        }

        if (frequency === "daily") {
            currentDate.setDate(currentDate.getDate() + 1);
        } else if (frequency === "weekly") {
            currentDate.setDate(currentDate.getDate() + 7);
        } else if (frequency === "monthly") {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else {
            currentDate.setDate(currentDate.getDate() + 14);
        }
    }

    return dateList;
}

/**
 * Adds users to a project and creates their reports
 * @param {array} project all information surrounding the project
 */
const addReportToDb = async (project) => {
    const dates = generateReportDates(
        project.first_report,
        project.end_date,
        project.report_frequency,
    );

    const names = parseNames(project.team_members);

    for (const employee of names) {
        let employeeId = await db.getEmployeeId(employee);

        addProject(project, employeeId[0].employeeid);

        const projecId = await db.getProjectId(
            project.project_name,
            employeeId[0].employeeid,
        );

        for (const date of dates) {
            addReport(projecId[0].id, employeeId[0].employeeid, date);
        }
    }
};

module.exports = addReportToDb;
