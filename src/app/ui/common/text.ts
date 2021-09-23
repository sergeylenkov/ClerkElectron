import Element, { ElementOptions } from './element';

interface TextOptions extends ElementOptions {
  text?: string;
}

class Text extends Element {
  constructor(options: TextOptions) {
    super('div', options);

    if (options.text) {
      this.text = options.text;
    }
  }

  set text(text: string) {
    this._element.innerText = text;
  }

  get text(): string {
    return this._element.innerText;
  }
}

export default Text;