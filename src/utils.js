"use strict";

const bcrypt = require("bcrypt");
const users = require("../db/users.js");

// If the user exsist and the password is correct, true will be returned
const checkCredentials = async (user, pass) => {
    const results = await users.getUser(user);
    if (results[0]) {
        const password = results[0].password;
        const isMatch = await bcrypt.compare(pass, password);

        if (isMatch) return true;
    }
    return false;
};

module.exports = {
    checkCredentials,
};
