"use-strict";

const knex = require("../db/knex.js");

function createUser(user) {
    return knex("users").insert(user);
}

// Returns all users
function getAllUsers() {
    return knex("users").select("*");
}

// If found, returns the user with the given email
function getUser(email) {
    return knex("users").where("email", email);
}

// function deleteUser(id) {
//     return knex("users").where("id", id).del();
// }

// function updateUser(id, user) {
//     return knex("users").where("id", id).update(user);
// }

module.exports = {
    getAllUsers,
    getUser,
    createUser,
};
