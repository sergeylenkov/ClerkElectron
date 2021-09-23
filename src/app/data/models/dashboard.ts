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

export interface DashboardDeposit {
  id: number;
  name: string;
  balance: number;
}