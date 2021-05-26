import { IDataProvider } from 'data/provider/DataProvider';
import { DashboardBalance } from '../models/dashboard';

class DashboardRepository {
  private _provider: IDataProvider;

  constructor(provider: IDataProvider) {
    this._provider = provider;
  }

  public getBalance(): DashboardBalance {
    return this._provider.getDashboardBalance();
  }
}

export { DashboardRepository };