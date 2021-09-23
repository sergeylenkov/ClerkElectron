import AccountsRepository from 'data/repositories/accounts';
import { Account, AccountTypes } from 'data/models/account';
import BaseViewModel from './BaseViewModel';

class TreeMenuViewModel extends BaseViewModel {
  private _repository: AccountsRepository;

  constructor(repository: AccountsRepository) {
    super();

    this._repository = repository;
  }

  public getReceiptsAccount(): Account[] {
    return this._repository.getByType(AccountTypes.Receipts);
  }

  public getDepositsAccount(): Account[] {
    return this._repository.getByType(AccountTypes.Deposits);
  }

  public getExpensesAccount(): Account[] {
    return this._repository.getByType(AccountTypes.Expenses);
  }
}

export default TreeMenuViewModel;