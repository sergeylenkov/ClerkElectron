import { Element } from '../core/element';
import { DashboardBalance } from './balance';
import { b } from '../../utils/bem';

const _block = 'dashboard';

export class Dashboard extends Element {
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _balancePanel: DashboardBalance;

  constructor() {
    super('div', { className: b(_block) });

    this._leftPanel = new Element('div', { className: b(_block, { element: 'left' }) });
    this.appendChild(this._leftPanel);

    this._rightPanel = new Element('div', { className: b(_block, { element: 'right' }) });
    this.appendChild(this._rightPanel);

    this._balancePanel = new DashboardBalance();
    this._leftPanel.appendChild(this._balancePanel);
  }

  update(): void {
    this._balancePanel.update();
  }
}
