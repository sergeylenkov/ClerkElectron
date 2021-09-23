import { Database } from 'sqlite3';

export interface Row {
  [key: string]: string;
}

class DBProvider {
  private _db: Database;

  constructor(path: string) {
    this._db = new Database(path);
  }

  get connection(): Database {
    return this._db;
  }

  async all(query: string, params: any[] = []): Promise<Row[]> {
    return new Promise((resolve, reject) => {
      this._db.all(query, params, (error: Error, rows: Row[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async get(query: string, params: any[] = []): Promise<Row> {
    return new Promise((resolve, reject) => {
      this._db.get(query, params, (error: Error, row: Row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }
}

export default DBProvider;