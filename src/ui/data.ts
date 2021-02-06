import { ipcRenderer } from 'electron';

export const getAccounts = (): void => {
  console.log('getAccounts');
  const result = ipcRenderer.sendSync('getAccounts', 'Test');
  console.log(result);
}