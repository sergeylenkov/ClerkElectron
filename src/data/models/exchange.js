const db = require('../db');

export const exchangeRates = {};

export function rates() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT er.from_currency_id, cf.short_name AS from_name, er.to_currency_id, ct.short_name AS to_name, rate, count, MAX(date)
                  FROM exchange_rates er, currencies cf, currencies ct
                 WHERE er.from_currency_id = cf.id AND er.to_currency_id = ct.id
                GROUP BY from_currency_id, to_currency_id`, [], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                rows.forEach((row) => {
                    exchangeRates[`${row.from_name}_${row.to_name}`] = row.count * row.rate;
                    exchangeRates[`${row.to_name}_${row.from_name}`] = row.count / row.rate;
                });

                resolve(exchangeRates);
            }
        });
    });
}