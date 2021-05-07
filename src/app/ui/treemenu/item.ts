import { Element } from '../common/element';
import { Text } from '../common/text';
import { Bem } from '../../utils/bem';

const _block = new Bem('tree-menu-item');

export class TreeMenuItem extends Element {
  private readonly _items: Element;
  private readonly _selection: Element;
  private readonly _content: Element;
  private readonly _icon: Element;
  private readonly _label: Text;
  private readonly _arrow: Element;
  private _expandable = false;
  private _expanded = false;

  constructor(name: string, icon: string, expandable?: boolean) {
    super('li', { className: _block.toString() });

    this._items = new Element('ul', { className: _block.getElement('items').toString() });
    this._selection = new Element('div', { className: _block.getElement('selection').toString() });
    this._content = new Element('div', { className: _block.getElement('content').toString() });
    this._icon = new Element('div', { className: _block.getElement('icon').toString() });
    this._label = new Text({ className: _block.getElement('label').toString() });
    this._arrow = new Element('div', { className: _block.getElement('arrow').toString() });

    this.appendChild(this._content);

    this._content.appendChild(this._selection);
    this._content.appendChild(this._arrow);
    this._content.appendChild(this._icon);
    this._content.appendChild(this._label);

    this.label = name;
    this.icon = icon;

    this.expandable = expandable ? expandable : false;

    this._arrow.element.addEventListener('click', this.toggleExpanded);
  }

  set icon(url: string) {
    this._icon.element.style.backgroundImage = `url(${url})`;
  }

  set label(text: string) {
    this._label.text = text;
  }

  set expandable(expandable: boolean) {
    const className = _block.addModifier('expandable').toString();

    if (expandable) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }

    this._expandable = expandable;
  }

  set expanded(expanded: boolean) {
    const className = _block.addModifier('expanded').toString();

    if (expanded) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }

    this._expanded = expanded;
  }

  set items(items: TreeMenuItem[]) {
    items.forEach(item => {
      this._items.appendChild(item);
    });

    this.appendChild(this._items);
  }

  toggleExpanded = (): void => {
    if (this._expandable) {
      this.expanded = !this._expanded;
    }
  }
}
