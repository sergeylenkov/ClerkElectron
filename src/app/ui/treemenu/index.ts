import Element from 'ui/common/element';
import TreeMenuItem from './item';
import { t, strings } from 'locales';
import TreeMenuViewModel from 'data/viewmodels/TreeMenuViewModel';
import { getAccountIcon, getMenuIcon } from 'utils/assets';

class TreeMenu extends Element {
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
  private _viewModel: TreeMenuViewModel;

  constructor(viewModel: TreeMenuViewModel) {
    super('ul', { class: 'tree-menu' });

    this._viewModel = viewModel;

    this._dashboardItem = new TreeMenuItem({ name: t(strings.treeMenu.dashboard), icon: getMenuIcon(0) });
    this.appendChild(this._dashboardItem);

    this._accountsItem = new TreeMenuItem({ name: t(strings.treeMenu.accounts), icon:  getMenuIcon(1), expandable: true });
    this.appendChild(this._accountsItem);

    this._receiptsItem = new TreeMenuItem({ name: t(strings.treeMenu.receipts), icon:  getMenuIcon(2), expandable: true });
    this._depositsItem = new TreeMenuItem({ name: t(strings.treeMenu.deposits), icon:  getMenuIcon(2), expandable: true });
    this._expensesItem = new TreeMenuItem({ name: t(strings.treeMenu.expenses), icon:  getMenuIcon(2), expandable: true });

    this._accountsItem.items = [this._receiptsItem, this._depositsItem, this._expensesItem];

    this._reportsItem = new TreeMenuItem({ name: t(strings.treeMenu.reports), icon:  getMenuIcon(4) });
    this.appendChild(this._reportsItem);

    this._budgetsItem = new TreeMenuItem({ name: t(strings.treeMenu.budgets), icon:  getMenuIcon(6) });
    this.appendChild(this._budgetsItem);

    this._goalsItem = new TreeMenuItem({ name: t(strings.treeMenu.goals), icon:  getMenuIcon(8) });
    this.appendChild(this._goalsItem);

    this._schedulersItem = new TreeMenuItem({ name: t(strings.treeMenu.schedulers), icon:  getMenuIcon(7) });
    this.appendChild(this._schedulersItem);

    this._alertsItem = new TreeMenuItem({ name: t(strings.treeMenu.alerts), icon:  getMenuIcon(12) });
    this.appendChild(this._alertsItem);

    this._tagsItem = new TreeMenuItem({ name: t(strings.treeMenu.tags), icon:  getMenuIcon(9) });
    this.appendChild(this._tagsItem);

    this._trashItem = new TreeMenuItem({ name: t(strings.treeMenu.trash), icon:  getMenuIcon(10) });
    this.appendChild(this._trashItem);
  }

  private _update = () => {
    this._receiptsItem.items = this._viewModel.getReceiptsAccount().map(account => {
      return new TreeMenuItem({ name: account.name, icon: getAccountIcon(account.icon) });
    });

    this._depositsItem.items = this._viewModel.getDepositsAccount().map(account => {
      return new TreeMenuItem({ name: account.name, icon: getAccountIcon(account.icon) });
    });

    this._expensesItem.items = this._viewModel.getExpensesAccount().map(account => {
      return new TreeMenuItem({ name: account.name, icon: getAccountIcon(account.icon) });
    });
  }

  onAttach(): void {
    this._viewModel.onUpdate.on(this._update);
    this._update();
  }

  onDetach(): void {
    this._viewModel.onUpdate.off(this._update);
  }
}

export default TreeMenu;