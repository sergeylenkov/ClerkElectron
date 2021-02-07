import { Element } from '../core/element';
import { Text } from '../core/text';
import { t, strings } from '../../locales';

export class DashboardBalance extends Element {
  private readonly _totalLabel: Text;

  constructor() {
    super('div', { className: 'dashboard-balance__container' });

    const header = new Text({ className: 'dashboard-balance__header', text: t(strings.dashboard.total) });
    this.appendChild(header);

    this._totalLabel = new Text( { className: 'dashboard-balance__total' });
    this.appendChild(this._totalLabel);
  }

  update(): void {
    this._totalLabel.text = '100.0';
  }
}
