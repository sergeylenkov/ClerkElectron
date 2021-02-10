import { Element } from '../common/element';
import { Header } from '../common/header';
import { t, strings } from '../../locales';
import { b } from '../../utils/bem';

const _block = 'dashboard-deposits';

export class DashboardDeposits extends Element {
  constructor() {
    super('div', { className: b(_block) });

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.accounts )}));
  }

  setAccounts(accounts: Account[]): void {
      //
  }
}