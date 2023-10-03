"use-strict";

/**
 * Checks what status a given day has
 * @param {date} date the date to be checkedw
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

module.exports = formatReports;
