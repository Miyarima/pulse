"use-strict";

function renderUpload(res, upload, message) {
    res.render("upload.ejs", {
        title: "Upload users",
        upload: upload,
        message: message,
    });
}

module.exports = {
    renderUpload,
};
