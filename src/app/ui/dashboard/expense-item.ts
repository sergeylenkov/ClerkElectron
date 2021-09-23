import Block from 'ui/common/block';
import Text from 'ui/common/text';
import Bem from 'utils/bem';
import Amount from 'ui/common/amount';

interface DashboardExpensesItemOptions {
  name: string;
  amount: number;
  progress: number;
}

const _block = new Bem('dashboard-expenses');

class DashboardExpensesItem extends Block {
  constructor(options: DashboardExpensesItemOptions) {
    super({ class: _block.getElement('item').toString() });

    const container = new Block({ class: _block.getElement('info').toString() });
    container.appendChild(new Text({ class: _block.getElement('name').toString(), text: options.name }));
    container.appendChild(new Amount({ class: _block.getElement('amount').toString(), amount: options.amount, withFraction: true, currency: 'RUB' }));

    this.appendChild(container);

    this.appendChild(new Block({ class: _block.getElement('progress').toString(), style: `width: ${options.progress}%` }));
  }
}

export default DashboardExpensesItem;