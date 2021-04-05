const { ipcMain } = require('electron');
const data = require('../data/data.js');

ipcMain.on('accounts/all', (event) => {
  data.accounts.getAll().then((accounts) => {
      event.returnValue = accounts;
  });
});

ipcMain.on('accounts/active', (event) => {
  data.accounts.getActive().then((accounts) => {
      event.returnValue = accounts;
  });
});

ipcMain.on('dashboard/balance', (event) => {
  data.dashboard.getBalance().then((items) => {
      event.returnValue = items;
  });
});