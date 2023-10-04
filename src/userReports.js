"use-strict";

/**
 * Checks what status a given day has
 * @param {date} date the date to be checked
 * @returns status of the date
 */
function status(date) {
    const today = Date.now();

    const milliDay = 86400000;
    const diff = date - today;

    if (date > today) {
        return "fine";
    } else if (milliDay > diff && diff > -milliDay) {
        return "today";
    }
    return "late";
}

/**
 * Checks what status the report has
 * @param {date} due the due date of the report
 * @param {date} turnedIn the date of when the report was turned in
 * @returns status of the report
 */
function allReportsStatus(due, turnedIn) {
    const dueDate = new Date(due);

    if (turnedIn === null) {
        const today = Date.now();

        if (due >= today) {
            return "fine";
        }

        return "missing";
    }

    const turnedInDate = new Date(turnedIn.split(" ")[0]);

    if (dueDate >= turnedInDate) {
        return "fine";
    }

    return "late";
}

/**
 * Will remove the time from the date
 * @param {date} date to beformated
 * @returns a formated date
 */
function removeTimeFromDate(date) {
    if (date !== null) {
        return date.split(" ")[0];
    }
    return null;
}

/**
 * Changes the format of date and adds a status
 * @param {Array} reports reports to restructure
 * @returns the fixed array
 */
const formatReports = (reports) => {
    let fixedReports = [];

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };

    reports.map((e) => {
        fixedReports.push({
            report_id: e.report_id,
            project_name: e.project_name,
            report_text: e.report_text,
            report_date: new Date(e.report_date).toLocaleDateString(
                "sv-SE",
                options,
            ),
            report_status: status(e.report_date),
        });
    });

    return fixedReports;
};

/**
 * Changes the format of date and adds a status
 * @param {Array} reports reports to restructure
 * @returns the fixed array
 */
const formatAllReports = (reports) => {
    let fixedReports = [];
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    const today = Date.now();

    reports.map((e) => {
        const reportDate = new Date(e.report_date);
        if (today > reportDate) {
            fixedReports.push({
                project_name: e.project_name,
                name: `${e.firstname} ${e.lastname}`,
                report_id: e.report_id,
                report_text: e.report_text,
                report_date: new Date(e.report_date).toLocaleDateString(
                    "sv-SE",
                    options,
                ),
                turned_in: removeTimeFromDate(e.report_updated),
                report_status: allReportsStatus(
                    e.report_date,
                    e.report_updated,
                ),
                report_marked: "no",
            });
        }
    });

    return fixedReports;
};

module.exports = {
    formatReports,
    formatAllReports,
};
