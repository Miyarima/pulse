/* eslint-disable no-undef */
"use strict";

const express = require("express");
const cookirParser = require("cookie-parser");
const app = express();
const path = require("path");
const port = 1337;

const routes = require("./routes.js");

app.set("views", "./views/pages");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookirParser());
app.use(routes);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
