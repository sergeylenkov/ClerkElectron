const fs = require('fs');
const electron = require("electron");

const app = electron.app;
const path = app.getPath('userData');

const rawdata = fs.readFileSync(`${path}/Config.json`);
let _settingsData = JSON.parse(rawdata);

const settings = {
    _data: _settingsData,
    getValue: function(name, defaultValue = '') {
        if (this._data[name]) {
            return this._data[name];
        }

        return defaultValue;
    },
    setValue: function(name, value) {
        this._data[name] = value;
    }
}

module.exports = settings;