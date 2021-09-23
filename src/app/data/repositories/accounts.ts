import IDataProvider from 'data/provider/DataProvider';
import { Account, AccountTypes } from '../models/account';

class AccountsRepository {
  private _provider: IDataProvider;

  constructor(provider: IDataProvider) {
    this._provider = provider;
  }

  public getAll(): Account[] {
    return this._provider.getAllAccounts();
  }

  public getActive(): Account[] {
    return this._provider.getActiveAccounts();
  }

  public getByType(type: AccountTypes): Account[] {
    const accounts = this.getActive();
    return accounts.filter(account => account.type === type);
  }
}

export default AccountsRepository;