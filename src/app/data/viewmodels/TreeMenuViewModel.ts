import { AccountsRepository } from '../repositories/accounts';
import { Account, AccountTypes } from '../models/account';

class TreeMenuViewModel {
  private _repository: AccountsRepository;

  constructor(repository: AccountsRepository) {
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

export { TreeMenuViewModel };