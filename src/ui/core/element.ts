interface ElementOptions {
  className: string;
}

export class Element {
  private readonly _element: HTMLElement;

  constructor(type: string, options?: ElementOptions) {
    this._element = document.createElement(type);

    if (options?.className) {
      this._element.className = options.className;
    }
  }

  get element(): HTMLElement {
    return this._element;
  }

  set class(className: string) {
    this._element.className = className;
  }

  addClass(className: string): void {
    this._element.classList.add(className);
  }

  removeClass(className: string): void {
    this._element.classList.remove(className);
  }

  appendTo(parent: HTMLElement | Element): void {
    if (parent instanceof Element) {
      parent.element.appendChild(this._element);
    } else {
      parent.appendChild(this._element);
    }
  }
}
