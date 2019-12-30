const sqlite3 = window.require("sqlite3");
const electron = window.require("electron");

const app = electron.remote.app;
const path = app.getPath('userData');

const db = new sqlite3.Database(`${path}/Database.sqlite`);

module.exports = db;