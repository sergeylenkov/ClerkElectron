import Block from 'ui/common/block';
import TreeMenu from 'ui/treemenu';
import Dashboard from 'ui/dashboard';
import Bem from 'utils/bem';
import AccountsRepository from 'data/repositories/accounts';
import BridgeProvider from 'data/provider/BridgeProvider';
import TreeMenuViewModel from 'data/viewmodels/TreeMenuViewModel';

import './styles/index.scss';

const _block: Bem = new Bem('app');

class App extends Block {
  constructor(parent: HTMLElement) {
    super({ class: _block.toString() });

    const repository = new AccountsRepository(new BridgeProvider());
    const viewModel = new TreeMenuViewModel(repository);

    const leftContainer = new Block({ class: _block.getElement('left').toString() });
    leftContainer.appendChild(new TreeMenu(viewModel));

    const rightContainer = new Block({ class: _block.getElement('right').toString() });
    rightContainer.appendChild(new Dashboard());

    this.appendChild(leftContainer);
    this.appendChild(rightContainer);

    this.appendTo(parent);
  }
}

export { App };