const electron = require('electron');
const path = require('path');
const settings = require('./settings.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const isDev = true;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: settings.getValue('WindowWidth', 800),
        height: settings.getValue('WindowHeight', 600),
        title: 'Clerk',
        icon: __dirname + '/assets/icon.ico',
        backgroundColor: '#ffffff',
        webPreferences: { nodeIntegration: true }
    });

    const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    mainWindow.loadURL(url);

    mainWindow.on('closed', function() {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
});