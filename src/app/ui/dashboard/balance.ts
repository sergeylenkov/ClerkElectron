import Amount from 'ui/common/amount';
import Header from 'ui/common/header';
import Block from 'ui/common/block';
import { t, strings } from 'locales';
import Bem from 'utils/bem';
import DashboardViewModel from 'data/viewmodels/DashboardViewModel';

const _block = new Bem('dashboard-balance');

class DashboardBalanceBlock extends Block {
  private _viewModel: DashboardViewModel;
  private _totalAmount: Amount;
  private _ownAmount: Amount;
  private _creditAmount: Amount;

  constructor(viewModel: DashboardViewModel) {
    super({ class: _block.toString() });

    this._viewModel = viewModel;

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.total) }));

    this._totalAmount = new Amount({ class: _block.getElement('total').toString(), amount: 0, currency: 'RUB', withFraction: true });
    this.appendChild(this._totalAmount);

    const content = new Block({ class: _block.getElement('content').toString() });
    this.appendChild(content);

    let group = new Block({ class: _block.getElement('group').toString() });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.ownFund) }));

    this._ownAmount = new Amount({ class: _block.getElement('item').toString(), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._ownAmount);

    group = new Block({ class: _block.getElement('group').toString() });
    content.appendChild(group);

    group.appendChild(new Header({ size: 2, text: t(strings.dashboard.creditFund) }));

    this._creditAmount = new Amount({ class: _block.getElement('item').toString(), amount: 0, currency: 'RUB', withFraction: true });
    group.appendChild(this._creditAmount);
  }

  private _update = () => {
    const balance = this._viewModel.getBalance();

    this._totalAmount.amount = balance.total;
    this._ownAmount.amount = balance.own;
    this._creditAmount.amount = balance.credit;
  }

  onAttach(): void {
    this._viewModel.onUpdate.on(this._update);
    this._update();
  }

  onDetach(): void {
    this._viewModel.onUpdate.off(this._update);
  }
}

export default DashboardBalanceBlock;