const db = require('../db');

export function getBalance() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a.id, a.name, a.credit_limit, c.short_name AS currency_name, a.type_id,
                    (SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = a.id AND deleted = 0) AS receipt,
                    (SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = a.id AND deleted = 0) AS expense
                FROM accounts a, currencies c WHERE (a.type_id = 1 OR a.type_id = 4) AND a.active = 1 AND a.currency_id = c.id ORDER BY a.order_id`, [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, type: row.type_id, receipt: row.receipt, expense: row.expense, amount: (row.receipt - row.expense), credit: row.credit_limit, currency: row.currency_name };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

export function getExpenses(from, to) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a.id, a.name, TOTAL(t.to_account_amount) as sum FROM transactions t, accounts a
                 WHERE (a.type_id = 2 OR a.type_id = 3) AND t.to_account_id = a.id AND t.paid_at >= ? AND t.paid_at <= ? AND t.deleted = 0
                 GROUP BY a.name ORDER BY sum DESC`, [from.toISOString(), to.toISOString()], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, amount: row.sum };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

export function getBudgets(from, to) {
    return new Promise((resolve, reject) => {
        _getBudgets().then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getBudgetBalance(item.ids, from, to).then((balance) => {
                    item.balance = balance;
                });
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(items);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getGoals() {
    return new Promise((resolve, reject) => {
        _getGoals().then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getGoalBalance(item.ids).then((balance) => {
                    item.balance = balance;
                });
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(items);
            });
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getDebts() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a.id, a.name, a.credit_limit, c.short_name AS currency_name, a.type_id,
                    (SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = a.id AND deleted = 0) AS receipt,
                    (SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = a.id AND deleted = 0) AS expense
                FROM accounts a, currencies c WHERE (a.type_id = 3 OR a.credit_limit > 0) AND a.active = 1 AND a.currency_id = c.id`, [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let amount = row.expense;
                    let balance = row.receipt;

                    if (row.credit_limit > 0) {
                        amount = row.credit_limit;
                        balance = row.credit_limit + (row.receipt - row.expense);
                    }

                    let remainAmount = balance - amount;

                    if (remainAmount < 0) {
                        let item = { id: row.id, name: row.name, type: row.type_id, amount: amount, balance: balance, remainAmount: remainAmount, currency: row.currency_name };
                        items.push(item);
                    }
                });

                resolve(items);
            }
        });
    });
}

export function getSchedulers(from, to) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT s.id, s.name, s.from_account_amount, s.to_account_amount, s.next_date FROM schedulers s
                 WHERE s.next_date >= ? AND s.next_date <= ? AND s.active = 1 ORDER BY s.id`, [from.toISOString(), to.toISOString()], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, date: row.next_date, fromAmount: row.from_account_amount, toAmount: row.to_account_amount };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getBudgets() {
    return new Promise((resolve, reject) => {
        db.all('SELECT b.id, b.name, b.amount, b.account_ids FROM budgets b', [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, amount: row.amount, ids: row.account_ids, expense: 0 };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getBudgetBalance(ids, from, to) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT TOTAL(t.to_account_amount) AS sum FROM transactions t, accounts a
                 WHERE a.type_id = 2 AND t.to_account_id IN(${ids}) AND t.to_account_id = a.id AND t.paid_at >= ? AND t.paid_at <= ? AND t.deleted = 0`, [from.toISOString(), to.toISOString()], (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row.sum);
            }
        });
    });
}

function _getGoals() {
    return new Promise((resolve, reject) => {
        db.all('SELECT g.id, g.name, g.date, g.amount, g.account_ids FROM goals g', [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name, amount: row.amount, ids: row.account_ids, balance: 0 };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getGoalBalance(ids) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT TOTAL(to_account_amount) AS sum FROM transactions WHERE to_account_id IN(${ids}) AND deleted = 0`, [], (error, row) => {
            if (error) {
                reject(error);
            } else {
                const receipt = row.sum;

                db.get(`SELECT TOTAL(from_account_amount) AS sum FROM transactions WHERE from_account_id IN(${ids}) AND deleted = 0`, [], (error, row) => {
                    if (error) {
                        reject(error);
                    } else {
                        const expense = row.sum;
                        const balance = receipt - expense;

                        resolve(balance);
                    }
                });
            }
        });
    });
}