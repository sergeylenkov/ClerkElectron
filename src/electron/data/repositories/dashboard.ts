import { DashboardBalance, DashboardBudget, DashboardDebt, DashboardExpense, DashboardGoal, DashboardScheduler } from '../models/dashboard';
import DBProvider, { Row } from '../db';

class DashboardRepository {
  private _db: DBProvider;

  constructor(db: DBProvider) {
    this._db = db;
  }

  async getBalance(): Promise<DashboardBalance> {
    const balance: DashboardBalance = {
      total: 0,
      own: 0,
      credit: 0,
    }

    try {
      const rows = await this._db.all(`SELECT a.id, a.name, a.credit_limit, c.short_name AS currency_name, a.type_id,
              (SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = a.id AND deleted = 0) AS receipt,
              (SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = a.id AND deleted = 0) AS expense
              FROM accounts a, currencies c WHERE (a.type_id = 1 OR a.type_id = 4) AND a.active = 1 AND a.currency_id = c.id ORDER BY a.order_id`
          );

      rows.forEach((row: Row) => {
        const amount = Number(row.receipt) - Number(row.expense);
        const credit_limit = Number(row.credit_limit);

        if (credit_limit) {
          balance.credit = amount > 0 ? credit_limit : credit_limit - amount;
        } else {
          balance.own = balance.own + amount;
        }
      });

      balance.total = balance.own + balance.credit;

      return balance;
    } catch (error) {
      return balance;
    }
  }

  async getExpenses(from: Date, to: Date): Promise<DashboardExpense[]> {
    try {
      const rows = await this._db.all(`SELECT a.id, a.name, TOTAL(t.to_account_amount) as sum FROM transactions t, accounts a
               WHERE (a.type_id = 2 OR a.type_id = 3) AND t.to_account_id = a.id AND t.paid_at >= ? AND t.paid_at <= ? AND t.deleted = 0
               GROUP BY a.name ORDER BY sum DESC`, [from.toISOString(), to.toISOString()]);

      const items: DashboardExpense[] = rows.map(row => {
        return { id: Number(row.id), name: row.name, amount: Number(row.sum) };
      });

      return items;
    } catch (error) {
      return [];
    }
  }

  async getBudgets(from: Date, to: Date): Promise<DashboardBudget[]> {
    try {
      const items = await this._getBudgets();

      for (const item of items) {
        item.balance = await this._getBudgetBalance(item.accounts, from, to);
      }

      return items;
    } catch (error) {
      return [];
    }
  }

  async getGoals(): Promise<DashboardGoal[]> {
    try {
      const items = await this._getGoals();

      for (const item of items) {
        item.balance = await this._getGoalBalance(item.accounts);
      }

      return items;
    } catch (error) {
      return [];
    }
  }

  async getDebts(): Promise<DashboardDebt[]> {
    try {
      const rows = await this._db.all(`SELECT a.id, a.name, a.credit_limit, c.short_name AS currency_name, a.type_id,
        (SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = a.id AND deleted = 0) AS receipt,
        (SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = a.id AND deleted = 0) AS expense
        FROM accounts a, currencies c WHERE (a.type_id = 3 OR a.credit_limit > 0) AND a.active = 1 AND a.currency_id = c.id`);

      const items: DashboardDebt[] = rows.map(row => {
        const expense = Number(row.expense);
        const receipt = Number(row.receipt);
        const creditLimit = Number(row.credit_limit);
        let balance = 0;

        if (creditLimit > 0) {
          balance = creditLimit + (receipt - expense);
        }

        const remainAmount = balance - expense;

        return { id: Number(row.id), name: row.name, type: Number(row.type_id), amount: expense, balance: balance, remainAmount: remainAmount, currency: row.currency_name };
      });

      return items.filter(item => item.remainAmount < 0);
    } catch (error) {
      return [];
    }
  }

  async getSchedulers(from: Date, to: Date): Promise<DashboardScheduler[]> {
    try {
      const rows = await this._db.all(`SELECT s.id, s.name, s.from_account_amount, s.to_account_amount, s.next_date FROM schedulers s
          WHERE s.next_date >= ? AND s.next_date <= ? AND s.active = 1 ORDER BY s.id`, [from.toISOString(), to.toISOString()]);

      const items: DashboardScheduler[] = rows.map(row => {
        return { id: Number(row.id), name: row.name, date: row.next_date, fromAmount: Number(row.from_account_amount), toAmount: Number(row.to_account_amount) }
      })

      return items;
    } catch (error) {
      return [];
    }
  }

  async _getBudgets(): Promise<DashboardBudget[]> {
    try {
      const rows = await this._db.all('SELECT b.id, b.name, b.amount, b.account_ids FROM budgets b');
      const items: DashboardBudget[] = rows.map(row => {
        return { id: Number(row.id), name: row.name, amount: Number(row.amount), accounts: row.account_ids, expense: 0, balance: 0 };
      });

      return items;
    } catch (error) {
      return [];
    }
  }

  async _getBudgetBalance(ids: string, from: Date, to: Date): Promise<number> {
    try {
      const row = await this._db.get(`SELECT TOTAL(t.to_account_amount) AS sum FROM transactions t, accounts a
        WHERE a.type_id = 2 AND t.to_account_id IN(${ids}) AND t.to_account_id = a.id AND t.paid_at >= ? AND t.paid_at <= ? AND t.deleted = 0`, [from.toISOString(), to.toISOString()]);

      return Number(row.sum);
    } catch (error) {
      return 0;
    }
  }

  async _getGoals(): Promise<DashboardGoal[]> {
    try {
      const rows = await this._db.all('SELECT g.id, g.name, g.date, g.amount, g.account_ids FROM goals g');
      const items: DashboardGoal[] = rows.map(row => {
        return { id: Number(row.id), name: row.name, amount: Number(row.amount), accounts: row.account_ids, balance: 0 };
      });

      return items;
    } catch (error) {
      return [];
    }
  }

  async _getGoalBalance(ids: string): Promise<number> {
    try {
      let row = await this._db.get(`SELECT TOTAL(to_account_amount) AS sum FROM transactions WHERE to_account_id IN(${ids}) AND deleted = 0`);
      const receipt = Number(row.sum);

      row = await this._db.get(`SELECT TOTAL(from_account_amount) AS sum FROM transactions WHERE from_account_id IN(${ids}) AND deleted = 0`);
      const expense = Number(row.sum);

      const balance = receipt - expense;
      return balance;
    } catch (error) {
      return 0;
    }
  }
}

export default DashboardRepository;