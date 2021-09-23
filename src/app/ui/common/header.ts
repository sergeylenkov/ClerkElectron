import Element from './element';

interface HeaderOptions {
  size: number;
  text: string;
}

class Header extends Element {
  constructor(options: HeaderOptions) {
    super(`h${options.size}`);

    this.text = options.text;
  }

  set text(text: string) {
    this._element.innerText = text;
  }

  get text(): string {
    return this._element.innerText;
  }
}

export default Header;