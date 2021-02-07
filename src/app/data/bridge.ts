import { ipcRenderer } from 'electron';

export const getAccounts = (): Account[] => {
  console.log('getAccounts');
  const result = ipcRenderer.sendSync('getAccounts', 'Test') as Account[];
  console.log(result);
  return result;
}