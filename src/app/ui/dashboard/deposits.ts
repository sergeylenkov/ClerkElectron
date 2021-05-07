import { Element } from '../common/element';
import { Header } from '../common/header';
import { t, strings } from '../../locales';

export class DashboardDeposits extends Element {
  constructor() {
    super('div', { className: 'dashboard-deposits' });

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.accounts )}));
  }

  setAccounts(accounts: Account[]): void {
      //
  }
}