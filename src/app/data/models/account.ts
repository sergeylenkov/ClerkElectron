export enum AccountTypes {
  Receipts = 0,
  Deposits = 1,
  Expenses = 2,
  Debts = 3,
  Virtual = 4,
  Archive = 5
}

export interface Account {
  id: number;
  name: string;
  description: string;
  type: AccountTypes;
  icon: number;
  active: boolean;
  balance: number;
}