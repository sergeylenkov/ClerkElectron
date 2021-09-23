import Text from 'ui/common/text';
import Bem from 'utils/bem';
import Amount from 'ui/common/amount';
import Block from 'ui/common/block';

interface DashboardDepositsItemOptions {
  name: string;
  amount: number;
}

const _block = new Bem('dashboard-deposits');

class DashboardDepositsItem extends Block {
  constructor(options: DashboardDepositsItemOptions) {
    super({ class: _block.getElement('item').toString() });

    this.appendChild(new Text({ class: _block.getElement('name').toString(), text: options.name }));
    this.appendChild(new Amount({ class: _block.getElement('amount').toString(), amount: options.amount, withFraction: true, currency: 'RUB' }));
  }
}

export default DashboardDepositsItem;