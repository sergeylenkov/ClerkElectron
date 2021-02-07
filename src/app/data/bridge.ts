import { ipcRenderer } from 'electron';

export const getAccounts = (): void => {
  console.log('getAccounts');
  const result = ipcRenderer.sendSync('getAccounts', 'Test') as string;
  console.log(result);
}