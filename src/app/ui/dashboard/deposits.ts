import Header from 'ui/common/header';
import { t, strings } from 'locales';
import DashboardViewModel from 'data/viewmodels/DashboardViewModel';
import DashboardDepositsItem from './deposit-item';
import Block from 'ui/common/block';

class DashboardDepositsBlock extends Block {
  private _viewModel: DashboardViewModel;
  private _elements: DashboardDepositsItem[] = [];

  constructor(viewModel: DashboardViewModel) {
    super({ class: 'dashboard-deposits' });

    this._viewModel = viewModel;

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.accounts )}));
  }

  private _update = () => {
    const deposits = this._viewModel.getDeposits();
    console.log(deposits);

    this._elements.forEach(element => element.detach());

    deposits.forEach(deposit => {
      const item = new DashboardDepositsItem({ name: deposit.name, amount: deposit.balance });
      this._elements.push(item);
      this.appendChild(item);
    })
  }

  onAttach(): void {
    this._viewModel.onUpdate.on(this._update);
    this._update();
  }

  onDetach(): void {
    this._viewModel.onUpdate.off(this._update);
  }
}

export default DashboardDepositsBlock;