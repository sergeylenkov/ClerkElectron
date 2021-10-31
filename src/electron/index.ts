import { ipcMain } from 'electron';
import path from 'path';
import Bridge from './bridge';
import App from './app';
import DBProvider from './data/db';
import AccountsRepository from './data/repositories/accounts';
import DashboardRepository from './data/repositories/dashboard';

const database = new DBProvider('C:\\Users\\Sergey\\AppData\\Roaming\\Clerk\\Database.sqlite');
const bridge = new Bridge(ipcMain, new AccountsRepository(database), new DashboardRepository(database));

let url = path.join(__dirname, '../app/index.html');

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:9000';
}

const app = new App(url, bridge);
