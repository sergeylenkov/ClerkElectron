import { Account } from '../models/account';
import * as bridge from '../bridge';

export function getAll(): Account[] {
  return bridge.getActiveAccounts();
}

export function getActive(): Account[] {
  return bridge.getActiveAccounts();
}