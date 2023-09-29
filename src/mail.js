"use-strict";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "pulsereporting@outlook.com",
        pass: "Reporting1337",
    },
});

function sendMail(email, firstname, string) {
    const options = {
        from: "pulsereporting@outlook.com",
        to: email,
        subject: "Finish setting up you account",
        html: `
            <h2>${firstname} Please finish setting up you account</h2>
            <p>Press the link below</p>
            <a href="http://localhost:1338/setup/${email}/${string}">Activate</a>
        `,
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    });
}

module.exports = sendMail;
