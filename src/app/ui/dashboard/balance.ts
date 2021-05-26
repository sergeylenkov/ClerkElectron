import { Element } from '../common/element';
import { Amount } from '../common/amount';
import { Header } from '../common/header';
import { Block } from '../common/block';
import { t, strings } from '../../locales';
import { Bem } from '../../utils/bem';
import { DashboardViewModel } from 'data/viewmodels/DashboardViewModel';



class DashboardBalanceBlock extends Element {
  private readonly _totalAmount: Amount;
  private readonly _ownAmount: Amount;
  private readonly _creditAmount: Amount;
  private _block = new Bem('dashboard-balance');
  private _viewModel: DashboardViewModel;

  constructor(viewModel: DashboardViewModel) {
    super('div', { className: 'dashboard-balance' });

    this._viewModel = viewModel;

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.total) }));

    this._totalAmount = new Amount({ className: this._block.getElement('total').toString(), amount: 0, currency: 'RUB', withFraction: true });
    this.appendChild(this._totalAmount);

    const content = new Block({ className: this._block.getElement('content').toString() });
    this.appendChild(content);

    let group = new Block({ className: this._block.getElement('group').toString() });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.ownFund) }));

    this._ownAmount = new Amount({ className: this._block.getElement('item').toString(), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._ownAmount);

    group = new Block({ className: this._block.getElement('group').toString() });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.creditFund) }));

    this._creditAmount = new Amount({ className: this._block.getElement('item').toString(), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._creditAmount);

    this._update();
  }

  private _update(): void {
    const balance = this._viewModel.getBalance();

    this._totalAmount.amount =  balance.total;
    this._ownAmount.amount = balance.own;
    this._creditAmount.amount = balance.credit;
  }
}

export { DashboardBalanceBlock }