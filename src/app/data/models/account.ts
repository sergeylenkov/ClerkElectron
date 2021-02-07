export enum AccountTypes {
  Receipts = 0,
  Deposits = 1,
  Expenses = 2,
  Debts = 3,
  Virtual = 4,
  Archive = 5
}

export interface Account {
  identifier: number;
  name: string;
  type: AccountTypes;
}