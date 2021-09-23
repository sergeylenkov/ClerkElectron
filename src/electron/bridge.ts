import { IpcMainEvent } from 'electron/main';
import AccountsRepository from './data/repositories/accounts';
import DashboardRepository from './data/repositories/dashboard';

class Bridge {
  private _eventEmmiter: NodeJS.EventEmitter;
  private _accountsRepository: AccountsRepository;
  private _dashboardRepository: DashboardRepository;

  constructor(eventEmmiter: NodeJS.EventEmitter, accountsRepository: AccountsRepository, dashboardRepository: DashboardRepository) {
    this._eventEmmiter = eventEmmiter;
    this._accountsRepository = accountsRepository;
    this._dashboardRepository = dashboardRepository;
  }

  subscribe(): void {
    this._eventEmmiter.on('accounts/all', (event: IpcMainEvent) => {
      this._accountsRepository.getAll().then(accounts => {
        event.returnValue = accounts;
      }).catch(() => {
        event.returnValue = [];
      })
    });

    this._eventEmmiter.on('accounts/active', (event: IpcMainEvent) => {
      this._accountsRepository.getActive().then((accounts) => {
        event.returnValue = accounts;
      }).catch(() => {
        event.returnValue = [];
      })
    });

    this._eventEmmiter.on('dashboard/balance', (event: IpcMainEvent) => {
      this._dashboardRepository.getBalance().then((balance) => {
        event.returnValue = balance;
      }).catch(() => {
        event.returnValue = [];
      });
    });

    this._eventEmmiter.on('dashboard/expenses', (event: IpcMainEvent) => {
      const from = new Date();
      from.setDate(1);

      const to = new Date();

      this._dashboardRepository.getExpenses(from, to).then((balance) => {
        event.returnValue = balance;
      }).catch(() => {
        event.returnValue = [];
      });
    });
  }
}

export default Bridge;