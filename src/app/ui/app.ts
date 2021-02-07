import { Element } from './core/element';
import { TreeMenu } from './treemenu';
import { Dashboard } from './dashboard';

import './app.scss';
import * as bridge from '../data/bridge';


export class App {
  private readonly _container: Element;
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _treeMenu: TreeMenu;
  private readonly _dashboard: Dashboard;

  constructor(parent: HTMLElement) {
    this._container = new Element('div', { className: 'app__container' });
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
    bridge.getAccounts();

    this._treeMenu.update();
    this._dashboard.update();
  }
}
