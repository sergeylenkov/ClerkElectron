import { ipcRenderer } from 'electron';
import { Account } from './models/account';

export const getAllAccounts = (): Account[] => {
  const result = ipcRenderer.sendSync('accounts.getAll') as Account[];

  return result;
}

export const getActiveAccounts = (): Account[] => {
  const result = ipcRenderer.sendSync('accounts.getActive') as Account[];

  return result;
}