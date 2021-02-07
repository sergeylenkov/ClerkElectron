import { Element } from '../core/element';
import { Text } from '../core/text';

export class TreeMenuItem extends Element {
  private readonly _content: Element;
  private readonly _selection: Element;
  private readonly _icon: Element;
  private readonly _label: Text;
  private readonly _arrow: Element;
  private _expandable = false;
  private _expanded = false;

  constructor(name: string, icon: string, expandable?: boolean) {
    super('li', { className: 'tree-menu-item' });

    this._content = new Element('div', { className: 'tree-menu-item__content' });
    this._selection = new Element('div', { className: 'tree-menu-item__selection' });
    this._icon = new Element('div', { className: 'tree-menu-item__icon' });
    this._label = new Text({ className: 'tree-menu-item__label' });
    this._arrow = new Element('div', { className: 'tree-menu-item__arrow' });

    //this._content.appendTo(this);

    this._selection.appendTo(this);
    this._arrow.appendTo(this);
    this._icon.appendTo(this);
    this._label.appendTo(this);

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

  set expandable(expandable : boolean) {
    if (expandable) {
      this.addClass('tree-menu-item__expandable');
    } else {
      this.removeClass('tree-menu-item__expandable');
    }

    this._expandable = expandable;
  }

  set expanded(expanded: boolean) {
    if (expanded) {
      this.addClass('tree-menu-item_expanded');
    } else {
      this.removeClass('tree-menu-item_expanded');
    }

    this._expanded = expanded;
  }

  toggleExpanded = (): void => {
    if (this._expandable) {
      this.expanded = !this._expanded;
    }
  }
}
