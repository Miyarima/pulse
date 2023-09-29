"use-strict";

const db = require("./users.js");
const bcrypt = require("bcrypt");

/**
 * Updates the password if the user exsist and check string is correct
 * @param {object} req contains information about the user
 * @param {object} res where to render
 * @returns what to render
 */
const changePassowrd = async (req, res) => {
    const email = req.params.email;
    const string = req.params.string;
    const pass1 = req.body.password1;
    const pass2 = req.body.password2;

    if (pass1 !== pass2) {
        return res.render("setup.ejs", {
            title: "Pulse | Set up Account",
            password: "wrong",
        });
    }

    const userExsist = await db.getUserWithString(email, string);
    const hash = await bcrypt.hash(pass1, 10);

    const update = {
        password: hash,
    };

    if (userExsist) {
        db.updateUserPassword(email, string, update)
            .then((result) => {
                console.log("Passwrod update successfully:", result);
            })
            .catch((error) => {
                console.error("Error inserting user:", error);
            });
        return res.redirect("/");
    }

    return res.render("setup.ejs", {
        title: "Pulse | Set up Account",
        password: "not exsist",
    });
};

module.exports = changePassowrd;
