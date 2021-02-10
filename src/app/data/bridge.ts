import { ipcRenderer } from 'electron';
import { Account } from './models/account';
import { DashboardBalance } from './models/dashboard';

export const getAllAccounts = (): Account[] => {
  const result = ipcRenderer.sendSync('accounts.getAll') as Account[];

  return result;
}

export const getActiveAccounts = (): Account[] => {
  const result = ipcRenderer.sendSync('accounts.getActive') as Account[];

  return result;
}

export const getDashboardBalance = (): DashboardBalance => {
  const result = ipcRenderer.sendSync('dashboard.getBalance') as DashboardBalance;

  return result;
}