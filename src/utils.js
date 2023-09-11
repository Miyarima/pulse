"use strict";

const checkCredentials = (user, pass) => {
    if (user === "test@test.com" && pass === "ligma") return true;
    return false;
};

module.exports = {
    checkCredentials,
};
