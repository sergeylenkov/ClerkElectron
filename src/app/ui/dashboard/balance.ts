import { Element } from '../core/element';
import { t, strings } from '../../locales';
import { b } from '../../utils/bem';
import { Amount } from '../core/amount';

const _block = 'dashboard-balance';

export class DashboardBalance extends Element {
  constructor() {
    super('div', { className: b(_block) });
  }

  update(): void {
    this._render();
  }

  _render(): void {
    const amount = new Amount({ className: b(_block, { element: 'total' }), amount: 34000.00, currency: 'RUB', withFraction: true });

    this._element.innerHTML = `
      <h1>${t(strings.dashboard.total)}</h1>
      ${amount.render()}
      <div class=${b(_block, { element: 'content' })}>
        <div class=${b(_block, { element: 'group' })}>
          <h2>${t(strings.dashboard.ownFund)}</h2>
        </div>
        <div class=${b(_block, { element: 'group' })}>
          <h2>${t(strings.dashboard.creditFund)}</h2>
        </div>
      </div>
    `;
  }
}