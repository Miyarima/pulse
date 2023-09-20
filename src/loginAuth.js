/* eslint-disable no-undef */
"use strict";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("./users.js");

/**
 * Checks if the users exsist, compares the passwords and redirect to where is appropriate
 * @param {object} req contains username and password
 * @param {object} res where to load/redirect to
 * @returns where to redirect
 */
const checkCredentials = async (req, res) => {
    const { username, password } = req.body;
    const user = await users.getUser(username);

    if (user[0]) {
        const isMatch = await bcrypt.compare(password, user[0].password);

        const sign = {
            username: username,
            role: user[0].role,
        };

        if (isMatch) {
            const token = jwt.sign(sign, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token, {
                httpOnly: true,
            });

            if (user[0].role === "admin") {
                return res.redirect("/dashboard");
            }
            return res.redirect("/dashboard/user");
        }
    }

    res.render("login.ejs", {
        title: "Pulse | Login",
        login: "wrong",
        user: username,
    });
};

module.exports = {
    checkCredentials,
};
