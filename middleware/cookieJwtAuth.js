/* eslint-disable no-undef */
"use-strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("../src/users.js");

/**
 * Check if the user has a valid token and is authorized
 * @param {string} role the role which has access to the page
 * @returns if the user isn't authorized
 */
const cookieJwtAuth = (role) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const inDb = await users.getUser(user.username);
            if (inDb[0].email === user.username && inDb[0].role === role) {
                req.firstname = inDb[0].firstname;
                req.lastname = inDb[0].lastname;
                next();
            } else {
                throw new Error("Unauthorized");
            }
        } catch (err) {
            console.error(err);
            res.clearCookie("token");
            return res.redirect("/");
        }
    };
};

module.exports = cookieJwtAuth;
