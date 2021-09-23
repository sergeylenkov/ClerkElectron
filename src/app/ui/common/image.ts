import Block from './block';
import { ElementOptions } from './element';

export interface ImageViewOptions extends ElementOptions {
  url?: string;
}

class ImageView extends Block {
  constructor(options: ImageViewOptions) {
    const { url, ...other } = options;

    super(other);

    if (url) {
      this.url = url;
    }
  }

  set url(url: string) {
    this._element.style.backgroundImage = `url(${url})`;
  }
}

export default ImageView;