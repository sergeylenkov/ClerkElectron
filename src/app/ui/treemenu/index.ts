import { Element } from '../core/element';
import { TreeMenuItem } from './item';
import { t, strings } from '../../locales';

export class TreeMenu extends Element {
  private readonly _dashboardItem: TreeMenuItem;
  private readonly _accountsItem: TreeMenuItem;
  private readonly _receiptsItem: TreeMenuItem;
  private readonly _depositsItem: TreeMenuItem;
  private readonly _expensesItem: TreeMenuItem;

  constructor() {
    super('div', { className: 'tree-menu__container' });

    this._dashboardItem = new TreeMenuItem(t(strings.treeMenu.dashboard), 'static/menu/0.png');
    this.appendChild(this._dashboardItem);

    this._accountsItem = new TreeMenuItem(t(strings.treeMenu.accounts), 'static/menu/1.png', true);
    this.appendChild(this._accountsItem);

    this._receiptsItem = new TreeMenuItem(t(strings.treeMenu.receipts), 'static/menu/2.png', true);
    this._accountsItem.appendChild(this._receiptsItem);

    this._depositsItem = new TreeMenuItem(t(strings.treeMenu.deposits), 'static/menu/2.png', true);
    this._accountsItem.appendChild(this._depositsItem);

    this._expensesItem = new TreeMenuItem(t(strings.treeMenu.expenses), 'static/menu/2.png', true);
    this._accountsItem.appendChild(this._expensesItem);

    const reports = new TreeMenuItem(t(strings.treeMenu.reports), 'static/menu/4.png');
    this.appendChild(reports);
  }

  update(): void {
    //
  }
}
