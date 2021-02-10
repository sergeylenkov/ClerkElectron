import { Element } from '../common/element';
import { Amount } from '../common/amount';
import { Header } from '../common/header';
import { Block } from '../common/block';
import { DashboardBalance } from '../../data/models/dashboard';
import { t, strings } from '../../locales';
import { b } from '../../utils/bem';

const _block = 'dashboard-balance';

export class DashboardBalanceBlock extends Element {
  private readonly _totalAmount: Amount;
  private readonly _ownAmount: Amount;
  private readonly _creditAmount: Amount;

  constructor() {
    super('div', { className: b(_block) });

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.total) }));

    this._totalAmount = new Amount({ className: b(_block, { element: 'total' }), amount: 0, currency: 'RUB', withFraction: true });
    this.appendChild(this._totalAmount);

    const content = new Block({ className: b(_block, { element: 'content' }) });
    this.appendChild(content);

    let group = new Block({ className: b(_block, { element: 'group' }) });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.ownFund) }));

    this._ownAmount = new Amount({ className: b(_block, { element: 'item' }), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._ownAmount);

    group = new Block({ className: b(_block, { element: 'group' }) });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.creditFund) }));

    this._creditAmount = new Amount({ className: b(_block, { element: 'item' }), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._creditAmount);
  }

  update(balance: DashboardBalance): void {
    this._totalAmount.amount = balance.total;
    this._ownAmount.amount = balance.own;
    this._creditAmount.amount = balance.credit;
  }
}