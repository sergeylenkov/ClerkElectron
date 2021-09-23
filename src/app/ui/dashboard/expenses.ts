import Header from 'ui/common/header';
import { t, strings } from 'locales';
import DashboardViewModel from 'data/viewmodels/DashboardViewModel';
import Bem from 'utils/bem';
import DashboardExpensesItem from './expense-item';
import Block from 'ui/common/block';

const _block = new Bem('dashboard-expenses');

class DashboardExpensesBlock extends Block {
  private _viewModel: DashboardViewModel;
  private _elements: DashboardExpensesItem[] = [];

  constructor(viewModel: DashboardViewModel) {
    super({ class: _block.toString() });

    this._viewModel = viewModel;

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.expenses )}));
  }

  private _update = () => {
    const expenses = this._viewModel.getExpenses();
    console.log(expenses);
    let max = 0;

    expenses.forEach(expense => {
      if (expense.amount > max) {
        max = expense.amount;
      }
    });

    this._elements.forEach(element => element.detach());

    expenses.forEach(expense => {
      const percent = (expense.amount / max) * 100;
      const item = new DashboardExpensesItem({ name: expense.name, amount: expense.amount, progress: percent });

      this._elements.push(item);
      this.appendChild(item);
    });
  }

  onAttach(): void {
    this._viewModel.onUpdate.on(this._update);
    this._update();
  }

  onDetach(): void {
    this._viewModel.onUpdate.off(this._update);
  }
}

export default DashboardExpensesBlock;