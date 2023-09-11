const knex = require("./knex.js");

function createUser(user) {
    return knex("user").insert(user);
}

function getAllUsers() {
    return knex("user").select("*");
}

function deleteUser(id) {
    return knex("user").where("id", id).del();
}

function updateUser(id, user) {
    return knex("user").where("id", id).update(user);
}

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
};
