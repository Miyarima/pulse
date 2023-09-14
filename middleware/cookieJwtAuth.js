/* eslint-disable no-undef */
"use-strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const users = require("../src/users.js");

const cookieJwtAuth = (role) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const inDb = await users.getUser(user.username);
            if (inDb[0].email === user.username && inDb[0].role === role) {
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