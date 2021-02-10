import { Element } from '../common/element';
import { Block } from '../common/block';
import { DashboardBalanceBlock } from './balance';
import { b } from '../../utils/bem';
import { getBalance } from '../../data/repositories/dashboard';

const _block = 'dashboard';

export class Dashboard extends Element {
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _balanceBlock: DashboardBalanceBlock;

  constructor() {
    super('div', { className: b(_block) });

    this._leftPanel = new Block({ className: b(_block, { element: 'left' }) });
    this.appendChild(this._leftPanel);

    this._rightPanel = new Block({ className: b(_block, { element: 'right' }) });
    this.appendChild(this._rightPanel);

    this._balanceBlock = new DashboardBalanceBlock();
    this._leftPanel.appendChild(this._balanceBlock);
  }

  update(): void {
    this._balanceBlock.update(getBalance());
  }
}
