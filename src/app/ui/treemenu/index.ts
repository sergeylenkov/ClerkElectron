import { Element } from '../core/element';
import { TreeMenuItem } from './item';
import { t, strings } from '../../locales';
import { b } from '../../utils/bem';

export class TreeMenu extends Element {
  private readonly _dashboardItem: TreeMenuItem;
  private readonly _accountsItem: TreeMenuItem;
  private readonly _receiptsItem: TreeMenuItem;
  private readonly _depositsItem: TreeMenuItem;
  private readonly _expensesItem: TreeMenuItem;
  private readonly _reportsItem: TreeMenuItem;
  private readonly _budgetsItem: TreeMenuItem;
  private readonly _goalsItem: TreeMenuItem;
  private readonly _schedulersItem: TreeMenuItem;
  private readonly _alertsItem: TreeMenuItem;
  private readonly _tagsItem: TreeMenuItem;
  private readonly _trashItem: TreeMenuItem;

  constructor() {
    super('ul', { className: b('tree-menu') });

    this._dashboardItem = new TreeMenuItem(t(strings.treeMenu.dashboard), 'static/menu/0.png');
    this.appendChild(this._dashboardItem);

    this._accountsItem = new TreeMenuItem(t(strings.treeMenu.accounts), 'static/menu/1.png', true);
    this.appendChild(this._accountsItem);

    this._receiptsItem = new TreeMenuItem(t(strings.treeMenu.receipts), 'static/menu/2.png', true);
    this._depositsItem = new TreeMenuItem(t(strings.treeMenu.deposits), 'static/menu/2.png', true);
    this._expensesItem = new TreeMenuItem(t(strings.treeMenu.expenses), 'static/menu/2.png', true);

    this._accountsItem.items = [this._receiptsItem, this._depositsItem, this._expensesItem];

    this._reportsItem = new TreeMenuItem(t(strings.treeMenu.reports), 'static/menu/4.png');
    this.appendChild(this._reportsItem);

    this._budgetsItem = new TreeMenuItem(t(strings.treeMenu.budgets), 'static/menu/6.png');
    this.appendChild(this._budgetsItem);

    this._goalsItem = new TreeMenuItem(t(strings.treeMenu.goals), 'static/menu/8.png');
    this.appendChild(this._goalsItem);

    this._schedulersItem = new TreeMenuItem(t(strings.treeMenu.schedulers), 'static/menu/7.png');
    this.appendChild(this._schedulersItem);

    this._alertsItem = new TreeMenuItem(t(strings.treeMenu.alerts), 'static/menu/12.png');
    this.appendChild(this._alertsItem);

    this._tagsItem = new TreeMenuItem(t(strings.treeMenu.tags), 'static/menu/9.png');
    this.appendChild(this._tagsItem);

    this._trashItem = new TreeMenuItem(t(strings.treeMenu.trash), 'static/menu/10.png');
    this.appendChild(this._trashItem);
  }

  update(): void {
    //
  }
}
