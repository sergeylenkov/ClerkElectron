import Block from 'ui/common/block';
import DashboardBalanceBlock from './balance';
import DashboardExpensesBlock from './expenses';
import Bem from 'utils/bem';
import DashboardViewModel from 'data/viewmodels/DashboardViewModel';
import DashboardRepository from 'data/repositories/dashboard';
import BridgeProvider from 'data/provider/BridgeProvider';
import DashboardDepositsBlock from './deposits';

const _block = new Bem('dashboard');

class Dashboard extends Block {
  private _viewModel: DashboardViewModel;

  constructor() {
    super({ class: _block.toString() });

    const repository = new DashboardRepository(new BridgeProvider());
    this._viewModel = new DashboardViewModel(repository);

    const leftContainer = new Block({ class: _block.getElement('left').toString() });

    leftContainer.appendChild(new DashboardBalanceBlock(this._viewModel));
    leftContainer.appendChild(new DashboardDepositsBlock(this._viewModel));
    leftContainer.appendChild(new DashboardExpensesBlock(this._viewModel));

    this.appendChild(leftContainer);

    this.appendChild(new Block({ class: _block.getElement('right').toString() }));
  }
}

export default Dashboard;