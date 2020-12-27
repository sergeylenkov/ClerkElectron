import { Element } from '../core/element';
import { TreeMenuItem } from './item';

import './index.scss';

export class TreeMenu extends Element {
  constructor() {
    super('div', { className: 'tree-menu__container' });

    const dashboard = new TreeMenuItem();

    dashboard.label = 'Dashboard';
    dashboard.icon = 'static/menu/0.png';

    dashboard.appendTo(this);
  }

  update(): void {
    //
  }
}
