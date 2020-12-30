import { Element } from '../core/element';
import { DashboardBalance } from './balance';
import './index.scss';

export class Dashboard extends Element {
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _balancePanel: DashboardBalance;

  constructor() {
    super('div', { className: 'dashboard__container' });

    this._leftPanel = new Element('div', { className: 'dashboard__left' });
    this.appendChild(this._leftPanel);

    this._rightPanel = new Element('div', { className: 'dashboard__right' });
    this.appendChild(this._rightPanel);

    this._balancePanel = new DashboardBalance();
    this._leftPanel.appendChild(this._balancePanel);
  }

  update(): void {
    this._balancePanel.update();
  }
}
