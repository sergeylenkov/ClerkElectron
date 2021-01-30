import { Element } from '../core/element';
import { TreeMenuItem } from './item';
import { t, strings } from '../../locales';

export class TreeMenu extends Element {
  constructor() {
    super('div', { className: 'tree-menu__container' });

    const dashboard = new TreeMenuItem();

    dashboard.label = t(strings.treeMenu.dashboard);
    dashboard.icon = 'static/menu/0.png';
    dashboard.expandable = false;

    this.appendChild(dashboard);

    const accounts = new TreeMenuItem();

    accounts.label = t(strings.treeMenu.accounts);
    accounts.icon = 'static/menu/1.png';
    accounts.expandable = true;

    this.appendChild(accounts);

    const reports = new TreeMenuItem();

    reports.label = t(strings.treeMenu.reports);
    reports.icon = 'static/menu/4.png';
    reports.expandable = true;

    this.appendChild(reports);
  }

  update(): void {
    //
  }
}
