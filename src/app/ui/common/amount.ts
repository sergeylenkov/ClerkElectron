import Element, { ElementOptions } from './element';

const currencySign: { [key: string] : string } = {
  'RUB': '₽',
  'USD': '$',
  'EUR': '€'
}

interface AmountOptions extends ElementOptions {
  amount: number;
  currency: string;
  withFraction: boolean;
}

class Amount extends Element {
  private _amount: number;
  private _sign = '';
  private _withFraction = false;
  private _html = '';

  constructor(options: AmountOptions) {
    super('div', options);

    this._amount = options.amount;
    this._sign = currencySign[options.currency];
    this._withFraction = options.withFraction;

    this.amount = this._amount;
  }

  set amount(value: number) {
    this._amount = value;

    this._format();
    this._render();
  }

  private _format(): void {
    let value = this._amount.toFixed(2).toString();
    value = value.trim().replace(' ', '').replace(',', '.');

    const values = value.split('.');
    const integer = values[0];
    const fraction = values[1];

    let formatted = '';
    let count = 0;

    for (let i = integer.length - 1; i >= 0; i--) {
        formatted = formatted + integer[i];
        count++;

        if (count === 3) {
            formatted = formatted + ' ';
            count = 0;
        }
    }

    formatted = formatted.split('').reverse().join('');
    formatted = formatted.replace('- ', '-');

    this._html = `<span><span>${formatted}</span> ${this._sign}</span>`;

    if (this._withFraction) {
      this._html = `<span><span>${formatted}</span><span class='fraction'>.${fraction}</span> ${this._sign}</span>`;
    }
  }

  private _render(): void {
    this.element.innerHTML = this._html;
  }
}

export default Amount;