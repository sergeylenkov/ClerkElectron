import { Element, ElementOptions } from './element';

export class Block extends Element {
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