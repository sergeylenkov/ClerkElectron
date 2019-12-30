const db = require('../db');

export function getDeletedCount(from, to) {
    return new Promise((resolve, reject) => {
        db.get('SELECT COUNT(*) AS count FROM transactions WHERE deleted = ?', [true], (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row.count);
            }
        });
    });
}