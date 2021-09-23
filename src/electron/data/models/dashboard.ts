export interface DashboardBalance {
  total: number;
  own: number;
  credit: number;
}

export interface DashboardExpense {
  id: number;
  name: string;
  amount: number;
}

export interface DashboardBudget {
  id: number;
  name: string;
  amount: number;
  expense: number;
  balance: number;
  accounts: string;
}

export interface DashboardGoal {
  id: number;
  name: string;
  amount: number;
  accounts: string;
  balance: number;
}

export interface DashboardScheduler {
  id: number;
  name: string;
  date: string;
  fromAmount: number;
  toAmount: number;
}

export interface DashboardDebt {
  id: number;
  name: string;
  type: number;
  amount: number;
  balance: number;
  remainAmount: number;
  currency: string;
}