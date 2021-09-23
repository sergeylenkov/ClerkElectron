import IDataProvider from './DataProvider';
import { ipcRenderer } from 'electron';
import { Account } from 'data/models/account';
import { DashboardBalance, DashboardExpense } from 'data/models/dashboard';

class BridgeProvider implements IDataProvider {
  public getAllAccounts(): Account[] {
    return ipcRenderer.sendSync('accounts/all') as Account[];
  }

  public getActiveAccounts(): Account[] {
    return ipcRenderer.sendSync('accounts/active') as Account[];
  }

  public getDashboardBalance(): DashboardBalance {
    return ipcRenderer.sendSync('dashboard/balance') as DashboardBalance;
  }

  public getDashboardExpenses(): DashboardExpense[] {
    return ipcRenderer.sendSync('dashboard/expenses') as DashboardExpense[];
  }
}

export default BridgeProvider;