import { ipcRenderer } from 'electron';
import { Account } from './models/account';
import { DashboardBalance } from './models/dashboard';

export const getAllAccounts = (): Account[] => {
  return ipcRenderer.sendSync('accounts/all') as Account[];
}

export const getActiveAccounts = (): Account[] => {
  return ipcRenderer.sendSync('accounts/active') as Account[];
}

export const getDashboardBalance = (): DashboardBalance => {
  return ipcRenderer.sendSync('dashboard/balance') as DashboardBalance;
}