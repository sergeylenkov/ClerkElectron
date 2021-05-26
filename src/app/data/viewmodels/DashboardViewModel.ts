import { DashboardBalance } from "data/models/dashboard";
import { DashboardRepository } from "data/repositories/dashboard";

class DashboardViewModel {
  private _repository: DashboardRepository;

  constructor(repository: DashboardRepository) {
    this._repository = repository;
  }

  public getBalance(): DashboardBalance {
    return this._repository.getBalance();
  }
}

export { DashboardViewModel }