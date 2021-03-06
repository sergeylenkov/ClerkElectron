import * as accounts from './models/accounts.js';
import * as dashboard from './models/dashboard.js'
import * as exchange from './models/exchange.js';

const data = {
    accounts: accounts,
    dashboard: dashboard,
    exchange: exchange
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