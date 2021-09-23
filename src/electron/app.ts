import { app, BrowserWindow } from 'electron';
import Bridge from './bridge';

class App {
  private _window: BrowserWindow | null = null;
  private _url: string;
  private _bridge: Bridge;

  constructor(url: string, bridge: Bridge) {
    this._url = url;
    this._bridge = bridge;

    app.whenReady().then(() => {
      this.createWindow();
      this._bridge.subscribe();
    }).catch(() => {
      this.quit();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.quit();
      }
    });

    app.on('activate', () => {
      if (this._window === null) {
        this.createWindow();
      }
    });
  }

  createWindow(): void {
    this._window = new BrowserWindow({
      width: 1200,
      height: 1000,
      title: 'Clerk',
      icon: __dirname + '/assets/icon.ico',
      backgroundColor: '#ffffff',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    void this._window.loadURL(this._url);

    this._window.on('closed', () => {
      this._window = null;
    });
  }

  quit(): void {
    app.quit();
    this._window = null;
  }
}

export default App;