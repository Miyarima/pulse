"use-strict";

const db = require("./users.js");

/**
 * Updates the given reports text in the database
 * @param {object} req contains information
 */
const updateReportText = async (req) => {
    const reportId = req.params.id;

    const update = {
        report_text: req.body.report,
    };

    db.updateUserReport(reportId, update)
        .then((result) => {
            console.log("Report updated successfully:", result);
        })
        .catch((error) => {
            console.error("Error inserting report:", error);
        });
};

/**
 * Updates the given reports text in the database
 * @param {object} req contains information
 */
const updateReportReadStatus = async (req) => {
    const reportId = req.params.id;

    const update = {
        report_marked: "yes",
    };

    db.updateUserReport(reportId, update)
        .then((result) => {
            console.log("Report updated successfully:", result);
        })
        .catch((error) => {
            console.error("Error inserting report:", error);
        });
};

module.exports = {
    updateReportText,
    updateReportReadStatus,
};
