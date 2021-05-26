import { Element } from './common/element';
import { TreeMenu } from './treemenu';
import { Dashboard } from './dashboard';
import { Bem } from '../utils/bem';
import { AccountsRepository } from '../data/repositories/accounts';
import { BridgeProvider } from '../data/provider/BridgeProvider';
import { TreeMenuViewModel } from '../data/viewmodels/TreeMenuViewModel';

import './styles/index.scss';

class App {
  private readonly _container: Element;
  private readonly _leftPanel: Element;
  private readonly _rightPanel: Element;
  private readonly _treeMenu: TreeMenu;
  private readonly _dashboard: Dashboard;
  private readonly _block: Bem = new Bem('app');

  constructor(parent: HTMLElement) {
    this._container = new Element('div', { className: this._block.toString() });
    this._container.appendTo(parent);

    this._leftPanel = new Element('div', { className: this._block.getElement('left').toString() });
    this._container.appendChild(this._leftPanel);

    this._rightPanel = new Element('div', { className: this._block.getElement('right').toString() });
    this._container.appendChild(this._rightPanel);
    console.log('1');
    const repository = new AccountsRepository(new BridgeProvider());
    const viewModel = new TreeMenuViewModel(repository);
    console.log('2');
    this._treeMenu = new TreeMenu(viewModel);
    this._leftPanel.appendChild(this._treeMenu);

    this._dashboard = new Dashboard();
    this._rightPanel.appendChild(this._dashboard);
  }

  run(): void {
    console.log('run');
  }
}

export { App };