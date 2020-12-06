import { app } from 'electron';
import * as fs from 'fs';

interface SettingsDictionary {
    [key: string]: any;
  }

class Settings {
    _data: SettingsDictionary = {};

    constructor(path: string) {
        const rawData = fs.readFileSync(path);
        this._data = JSON.parse(rawData.toString());
    }

    setValue(name: string, value: any): void {
        this._data[name] = value;
    }

    getValue(name: string, defaultValue = ''): any {
        return this._data[name] || defaultValue;
    }
}

const path = app.getPath('userData');

export const settings = new Settings(`${path}/Config.json`);