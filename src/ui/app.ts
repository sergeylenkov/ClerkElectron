import { Element } from './core/element';
import { TreeMenu } from './treemenu';

import './app.scss';

export class App {
  private readonly container: Element;
  private readonly leftContainer: Element;
  private readonly rightContainer: Element;
  private readonly treeMenu: TreeMenu;

  constructor(parent: HTMLElement) {
    this.container = new Element('div', { className: 'app__container' });
    this.container.appendTo(parent);

    this.leftContainer = new Element('div', { className: 'app__left' });
    this.leftContainer.appendTo(this.container.element);

    this.rightContainer = new Element('div', { className: 'app__right' });
    this.rightContainer.appendTo(this.container.element);

    this.treeMenu = new TreeMenu();
    this.treeMenu.appendTo(this.leftContainer);
  }

  update(): void {
    this.treeMenu.update();
  }
}
