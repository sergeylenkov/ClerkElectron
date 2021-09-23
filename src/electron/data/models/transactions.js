const db = require('../db');

function getTransactions(from, to) {
    return new Promise((resolve, reject) => {
        _getTransactions(from, to).then((items) => {
            let promises = [];

            items.forEach((item) => {
                const promise = _getTags(item.id).then((tags) => {
                    item.tags = tags;
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(items);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

function getRecents(limit) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.*
                  FROM transactions t, accounts a1, accounts a2
                WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id ORDER BY t.paid_at DESC, t.created_at DESC LIMIT ?`, [limit], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    const item = _convertRow(row);
                    items.push(item);
                });

                let promises = [];

                items.forEach((item) => {
                    const promise = _getTags(item.id).then((tags) => {
                        item.tags = tags;
                    });

                    promises.push(promise);
                });

                Promise.all(promises).then(() => {
                    resolve(items);
                });
            }
        });
    });
}

function getDeletedCount(from, to) {
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

function _getTransactions(from, to) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.*
                  FROM transactions t, accounts a1, accounts a2
                WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id AND t.paid_at >= ? AND t.paid_at <= ? ORDER BY t.paid_at DESC, t.created_at DESC`, [from, to], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    const item = _convertRow(row);
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _getTags(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT t.id, t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = ? AND t.id = tt.tag_id', [id], (error, rows) => {
            if (error) {
                reject(error);
            } else {
                let items = [];

                rows.forEach((row) => {
                    let item = { id: row.id, name: row.name };
                    items.push(item);
                });

                resolve(items);
            }
        });
    });
}

function _convertRow(row) {
    const item = {
        id: row.id,
        fromName: row.from_account_name,
        toName: row.to_account_name,
        fromAmount: row.from_account_amount,
        toAmount: row.to_account_amount,
        date: new Date(row.paid_at),
        tags: []
    };

    return item;
}

module.exports = { getTransactions, getRecents, getDeletedCount };