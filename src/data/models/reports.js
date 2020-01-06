const db = require('../db');

export function getExpensesByMonth(from, to) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT t.paid_at AS date, TOTAL(t.from_account_amount) AS sum FROM transactions t, accounts a
                 WHERE t.deleted = 0 AND t.paid_at >= ? AND t.paid_at <= ? AND t.to_account_id = a.id AND (a.type_id = 2 OR a.type_id = 3)
                 GROUP BY strftime('%Y %m', t.paid_at) ORDER BY date`, [from, to], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { date: row.date, sum: row.sum };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}
