"use strict";
var electron = require('electron');
var path = require('path');
var settings = require('./settings.js');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var isDev = true;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: settings.getValue('WindowWidth', 800),
        height: settings.getValue('WindowHeight', 600),
        title: 'Clerk',
        icon: __dirname + '/assets/icon.ico',
        backgroundColor: '#ffffff',
        webPreferences: { nodeIntegration: true }
    });
    var url = isDev ? 'http://localhost:3000' : "file://" + path.join(__dirname, '../build/index.html');
    mainWindow.loadURL(url);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map