import { DashboardBalance, DashboardDeposit, DashboardExpense } from '../models/dashboard';
import DashboardRepository from '../repositories/dashboard';
import BaseViewModel from './BaseViewModel';

class DashboardViewModel extends BaseViewModel {
  private _repository: DashboardRepository;

  constructor(repository: DashboardRepository) {
    super();

    this._repository = repository;
  }

  public getBalance(): DashboardBalance {
    return this._repository.getBalance();
  }

  public getExpenses(): DashboardExpense[] {
    return this._repository.getExpenses();
  }

  public getDeposits(): DashboardDeposit[] {
    return this._repository.getDeposits();
  }
}

export default DashboardViewModel;