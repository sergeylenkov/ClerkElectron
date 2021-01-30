import { Element } from '../core/element';

export class TreeMenuItem extends Element {
  private readonly _content: Element;
  private readonly _selection: Element;
  private readonly _icon: Element;
  private readonly _label: Element;
  private readonly _arrow: Element;

  constructor() {
    super('div', { className: 'tree-menu-item__container' });

    this._content = new Element('div', { className: 'tree-menu-item__content' });
    this._selection = new Element('div', { className: 'tree-menu-item__selection' });
    this._icon = new Element('div', { className: 'tree-menu-item__icon' });
    this._label = new Element('div', { className: 'tree-menu-item__label' });
    this._arrow = new Element('div', { className: 'tree-menu-item__arrow' });

    this._content.appendTo(this);

    this._selection.appendTo(this._content);
    this._arrow.appendTo(this._content);
    this._icon.appendTo(this._content);
    this._label.appendTo(this._content);
  }

  set icon(url: string) {
    this._icon.element.style.backgroundImage = `url(${url})`;
  }

  set label(text: string) {
    this._label.element.innerText = text;
  }

  set expandable(expandable : boolean) {
    if (expandable) {
      this.addClass('tree-menu-item__container__expandable');
    } else {
      this.removeClass('tree-menu-item__container__expandable');
    }
  }
}
