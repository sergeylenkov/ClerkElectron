import { Element } from './common/element';
import { TreeMenu } from './treemenu';
import { Dashboard } from './dashboard';
import { getActive } from '../data/repositories/accounts';

import './styles/index.scss';

export class App {
  private readonly _container: Element;
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _treeMenu: TreeMenu;
  private readonly _dashboard: Dashboard;

  constructor(parent: HTMLElement) {
    this._container = new Element('div', { className: 'app' });
    this._container.appendTo(parent);

    this._leftPanel = new Element('div', { className: 'app__left' });
    this._container.appendChild(this._leftPanel);

    this._rightPanel = new Element('div', { className: 'app__right' });
    this._container.appendChild(this._rightPanel);

    this._treeMenu = new TreeMenu();
    this._leftPanel.appendChild(this._treeMenu);

    this._dashboard = new Dashboard();
    this._rightPanel.appendChild(this._dashboard);
  }

  update(): void {
    this._treeMenu.update(getActive());
    this._dashboard.update();
  }
}
