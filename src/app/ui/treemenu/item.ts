import Element from 'ui/common/element';
import Block from 'ui/common/block';
import Text from 'ui/common/text';
import ImageView from 'ui/common/image';
import Bem from 'utils/bem';

interface ITreeMenuItem {
  name: string;
  icon: string;
  expandable?: boolean;
}

const _block = new Bem('tree-menu-item');

class TreeMenuItem extends Element {
  private readonly _items: Element;
  private readonly _selection: Element;
  private readonly _content: Element;
  private readonly _icon: ImageView;
  private readonly _label: Text;
  private readonly _arrow: Element;
  private _expandable = false;
  private _expanded = false;

  constructor(options: ITreeMenuItem) {
    super('li', { class: _block.toString() });

    this._items = new Element('ul', { class: _block.getElement('items').toString() });
    this._selection = new Block({ class: _block.getElement('selection').toString() });
    this._content = new Block({ class: _block.getElement('content').toString() });
    this._icon = new ImageView({ class: _block.getElement('icon').toString() });
    this._label = new Text({ class: _block.getElement('label').toString() });
    this._arrow = new Block({ class: _block.getElement('arrow').toString() });

    this.appendChild(this._content);

    this._content.appendChild(this._selection);
    this._content.appendChild(this._arrow);
    this._content.appendChild(this._icon);
    this._content.appendChild(this._label);

    this.label = options.name;
    this.icon = options.icon;

    this.expandable = options.expandable ? options.expandable : false;
  }

  onAttach(): void {
    this._arrow.element.addEventListener('click', this.toggleExpanded);
  }

  onDetach(): void {
    this._arrow.element.removeEventListener('click', this.toggleExpanded);
  }

  set icon(url: string) {
    this._icon.url = url;
  }

  set label(text: string) {
    this._label.text = text;
  }

  set expandable(expandable: boolean) {
    const className = _block.getModifier('expandable');

    if (expandable) {
      this.addClass(className);
    } else {
      this.removeClass(className);
    }

    this._expandable = expandable;
  }

  set expanded(expanded: boolean) {
    const className = _block.getModifier('expanded').toString();

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

export default TreeMenuItem;