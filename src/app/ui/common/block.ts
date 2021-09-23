import Element, { ElementOptions } from './element';

class Block extends Element {
  constructor(options: ElementOptions) {
    super('div', options);
  }

  set hidden(hidden: boolean) {
    if (hidden) {
      this.addClass('hidden');
    } else {
      this.removeClass('hidden');
    }
  }
}

export default Block;