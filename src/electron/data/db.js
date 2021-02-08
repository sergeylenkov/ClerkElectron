const sqlite3 = require('sqlite3');
const electron = require('electron');

const path = 'C:\\Users\\Sergey\\AppData\\Roaming\\Clerk';

const db = new sqlite3.Database(`${path}/Database.sqlite`);

module.exports = db;