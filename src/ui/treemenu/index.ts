import { Element } from '../core/element';
import { TreeMenuItem } from './item';

import './index.scss';

export class TreeMenu extends Element {
  constructor() {
    super('div', { className: 'tree-menu__container' });

    const dashboard = new TreeMenuItem();

    dashboard.label = 'Dashboard';
    dashboard.icon = 'static/menu/0.png';
    dashboard.expandable = false;

    dashboard.appendTo(this);

    const accounts = new TreeMenuItem();

    accounts.label = 'Accounts';
    accounts.icon = 'static/menu/1.png';
    accounts.expandable = true;

    accounts.appendTo(this);

    const reports = new TreeMenuItem();

    reports.label = 'Reports';
    reports.icon = 'static/menu/4.png';
    reports.expandable = true;

    reports.appendTo(this);
  }

  update(): void {
    //
  }
}
