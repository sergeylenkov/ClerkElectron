import { Element } from '../common/element';
import { Block } from '../common/block';
import { DashboardBalanceBlock } from './balance';
import { Bem } from '../../utils/bem';
import { DashboardViewModel } from 'data/viewmodels/DashboardViewModel';
import { DashboardRepository } from 'data/repositories/dashboard';
import { BridgeProvider } from 'data/provider/BridgeProvider';

export class Dashboard extends Element {
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _balanceBlock: DashboardBalanceBlock;
  private _block = new Bem('dashboard');
  private _viewModel: DashboardViewModel;

  constructor() {
    super('div', { className: 'dashboard' });

    const repository = new DashboardRepository(new BridgeProvider());
    this._viewModel = new DashboardViewModel(repository);

    this._leftPanel = new Block({ className: this._block.getElement('left').toString() });
    this.appendChild(this._leftPanel);

    this._rightPanel = new Block({ className: this._block.getElement('right').toString() });
    this.appendChild(this._rightPanel);

    this._balanceBlock = new DashboardBalanceBlock(this._viewModel);
    this._leftPanel.appendChild(this._balanceBlock);
  }
}
