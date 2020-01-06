import * as accounts from './models/accounts.js';
import * as transactions from './models/transactions.js';
import * as dashboard from './models/dashboard.js'
import * as exchange from './models/exchange.js';
import * as reports from './models/reports.js';

const data = {
    accounts: accounts,
    transactions: transactions,
    dashboard: dashboard,
    exchange: exchange,
    reports: reports
}

export default data;

export const AccountTypes = {
    Receipts: 0,
    Deposits: 1,
    Expenses: 2,
    Debts: 3,
    Virtual: 4,
    Archive: 5
}