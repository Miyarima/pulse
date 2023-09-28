"use-strict";

// const db = require("./users.js");

const formatReports = (reports) => {
    let fixedReports = [];
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    reports.map((e) => {
        fixedReports.push({
            report_id: e.report_id,
            project_name: e.project_name,
            report_text: e.report_text,
            report_date: new Date(e.report_date).toLocaleDateString(options),
        });
    });

    return fixedReports;
};

module.exports = formatReports;
