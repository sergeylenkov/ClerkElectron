import { DashboardBalance, DashboardExpense } from 'data/models/dashboard';
import { Account } from 'data/models/account';

interface IDataProvider {
  getAllAccounts(): Account[];
  getActiveAccounts(): Account[];
  getDashboardBalance(): DashboardBalance;
  getDashboardExpenses(): DashboardExpense[];
}

export default IDataProvider;