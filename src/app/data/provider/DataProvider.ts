import { DashboardBalance } from '../models/dashboard';
import { Account } from '../models/account';

interface IDataProvider {
  getAllAccounts(): Account[];
  getActiveAccounts(): Account[];
  getDashboardBalance(): DashboardBalance;
}

export { IDataProvider }