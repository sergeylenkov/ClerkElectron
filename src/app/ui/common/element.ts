export interface ElementOptions {
  class?: string;
  style?: string;
}

class Element {
  protected readonly _element: HTMLElement;
  private _children: Element[] = [];

  constructor(type: string, options?: ElementOptions) {
    this._element = document.createElement(type);

    if (options?.class) {
      this.class = options.class;
    }

    if (options?.style) {
      this.style = options.style;
    }
  }

  get element(): HTMLElement {
    return this._element;
  }

  set class(className: string) {
    this._element.className = className;
  }

  set style(style: string) {
    this._element.style.cssText = style;
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

  appendChild(child: Element): void {
    this._children.push(child);
    this._element.appendChild(child.element);

    child.onAttach();
  }

  detach(): void {
    this._children.forEach(child =>  {
      child.detach();
      child.onDetach();
    });

    this._element.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAttach(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onDetach(): void {}
}

export default Element;