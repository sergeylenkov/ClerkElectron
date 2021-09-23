import { Row } from "../db";

export enum AccountTypes {
  Receipts = 0,
  Deposits = 1,
  Expenses = 2,
  Debts = 3,
  Virtual = 4,
  Archive = 5
}

export class Account {
  id: number;
  name: string;
  description: string;
  type: number;
  icon: number;
  creditLimit: number;
  currency: number;
  active: boolean;
  balance: number;

  constructor(row: Row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.description = row.note;
    this.type = Number(row.type_id);
    this.icon = Number(row.icon_id);
    this.creditLimit = Number(row.credit_limit);
    this.currency = Number(row.currency_id);
    this.active = Boolean(row.active);
    this.balance = 0;
  }
}