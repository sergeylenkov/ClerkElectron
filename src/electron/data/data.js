const accounts = require( './models/accounts.js');
const transactions = require( './models/transactions.js');
const dashboard = require( './models/dashboard.js');
//const exchange = require( './models/exchange.js');
//const reports = require( './models/reports.js');

const data = {
    accounts: accounts,
    transactions: transactions,
    dashboard: dashboard
}

module.exports = data;

/*export const AccountTypes = {
    Receipts: 0,
    Deposits: 1,
    Expenses: 2,
    Debts: 3,
    Virtual: 4,
    Archive: 5
}*/