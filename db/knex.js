// Creates a connectin with the SQLite database pulse
// Using useNullAsDefault flag beacues SQLite doesn't support default values
const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "pulse.sqlite3",
    },
    useNullAsDefault: true,
});

module.exports = connectedKnex;
