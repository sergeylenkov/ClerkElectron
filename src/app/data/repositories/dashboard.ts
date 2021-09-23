import { AccountTypes } from 'data/models/account';
import IDataProvider from 'data/provider/DataProvider';
import { DashboardBalance, DashboardDeposit, DashboardExpense } from 'data/models/dashboard';

class DashboardRepository {
  private _provider: IDataProvider;

  constructor(provider: IDataProvider) {
    this._provider = provider;
  }

  public getBalance(): DashboardBalance {
    return this._provider.getDashboardBalance();
  }

  public getExpenses(): DashboardExpense[] {
    return this._provider.getDashboardExpenses();
  }

  public getDeposits(): DashboardDeposit[] {
    const accounts = this._provider.getActiveAccounts().filter(account => account.type === AccountTypes.Deposits || account.type === AccountTypes.Virtual);

    return accounts.map(account => {
      return { id: account.id, name: account.name, balance: account.balance }
    })
  }
}

export default DashboardRepository;