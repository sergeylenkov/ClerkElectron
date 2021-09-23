import { Account, AccountTypes } from '../models/account';
import DBProvider, { Row } from '../db';

class AccountsRepository {
  private _db: DBProvider;

  constructor(db: DBProvider) {
    this._db = db;
  }

  async getAll(): Promise<Account[]> {
    try {
      const rows = await this._db.all('SELECT * FROM accounts a ORDER BY a.order_id');
      const accounts: Account[] = rows.map(row => new Account(row));

      for (const account of accounts) {
        account.balance = await this.getBalance(account);
      }

      return accounts;
    } catch (error) {
      return [];
    }
  }

  async getActive(): Promise<Account[]> {
    try {
      const rows = await this._db.all('SELECT * FROM accounts a WHERE active = ? ORDER BY a.order_id', [true]);
      const accounts = rows.map(row => new Account(row));

      for (const account of accounts) {
        account.balance = await this.getBalance(account);
      }

      return accounts;
    } catch (error) {
      return [];
    }
  }

  async getByType(type: number): Promise<Account[]> {
    try {
      const rows = await this._db.all('SELECT * FROM accounts a WHERE type_id = ? ORDER BY a.order_id', [type]);
      const accounts = rows.map(row => new Account(row));

      for (const account of accounts) {
        account.balance = await this.getBalance(account);
      }

      return accounts;
    } catch (error) {
      return [];
    }
  }

  async getBalance(account: Account): Promise<number> {
    const receipt = await this._db.get('SELECT TOTAL(to_account_amount) AS value FROM transactions WHERE to_account_id = ? AND deleted = 0', [account.id]);
    const expense = await this._db.get('SELECT TOTAL(from_account_amount) AS value FROM transactions WHERE from_account_id = ? AND deleted = 0', [account.id]);

    if (account.type === AccountTypes.Receipts || account.type === AccountTypes.Expenses) {
      return Number(expense.value) - Number(receipt.value);
    }

		return Number(receipt.value) - Number(expense.value);
  }
}

export default AccountsRepository;
