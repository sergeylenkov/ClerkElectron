import db from '../db.js';

export function all() {
    return new Promise((resolve, reject) => {
        let accounts = [];

        db.all('SELECT * FROM accounts a ORDER BY a.order_id', [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                rows.forEach((row) => {
                    const account = _convertRow(row);
                    accounts.push(account);
                });

                resolve(accounts);
            }
        });
    });
}

export function active() {
    return new Promise((resolve, reject) => {
        let accounts = [];

        db.all('SELECT * FROM accounts a WHERE active = ? ORDER BY a.order_id', [true], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                rows.forEach((row) => {
                    const account = _convertRow(row);
                    accounts.push(account);
                });

                resolve(accounts);
            }
        });
    });
}

export function byType(type) {
    return new Promise((resolve, reject) => {
        let accounts = [];

        db.all('SELECT * FROM accounts a WHERE type_id = ? ORDER BY a.order_id', [type], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                rows.forEach((row) => {
                    const account = _convertRow(row);
                    accounts.push(account);
                });

                resolve(accounts);
            }
        });
    });
}

function _convertRow(row) {
    const item = {
        id: row.id,
        name: row.name,
        description: row.note,
        type: row.type_id,
        icon: row.icon_id,
        creditLimit: row.credit_limit,
        currency: row.currency_id,
        active: Boolean(row.active)
    };

    return item;
}