const knex = require("./knex.js");

function createUser(user) {
    return knex("users").insert(user);
}

function getAllUsers() {
    return knex("users").select("*");
}

function getUser(email) {
    return knex("users").where("email", email);
}

// function deleteUser(id) {
//     return knex("users").where("id", id).del();
// }

function updateUser(id, user) {
    return knex("users").where("id", id).update(user);
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
};
