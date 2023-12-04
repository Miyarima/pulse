"use-strict";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "pulsereportin@outlook.com",
        pass: "Reporting",
    },
});

async function sendMail(mailToSend) {
    for (const mail of mailToSend) {
        const options = {
            from: "pulsereporting@outlook.com",
            to: mail[0],
            subject: "Finish setting up you account",
            html: `
                <h2>Please finish setting up you account</h2>
                <p>Your username: ${mail[0]} </p>
                <p>Press the link below to change your password!</p>
                <a href="http://localhost:1337/setup/${mail[0]}/${mail[1]}">Activate</a>
            `,
        };

        try {
            await sendEmailWithDelay(options, 1000);
            console.log("Sent: " + mail[0]);
        } catch (err) {
            console.error(err);
        }
    }
}

async function sendEmailWithDelay(options, delay) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            try {
                const info = await transporter.sendMail(options);
                resolve(info);
            } catch (err) {
                resolve(err);
            }
        }, delay);
    });
}

module.exports = sendMail;
