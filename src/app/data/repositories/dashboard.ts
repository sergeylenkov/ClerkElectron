import { DashboardBalance } from '../models/dashboard';
import * as bridge from '../bridge';

export function getBalance(): DashboardBalance {
  return bridge.getDashboardBalance();
}