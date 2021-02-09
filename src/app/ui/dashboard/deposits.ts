import { Element } from '../core/element';
import { Header } from '../core/header';
import { t, strings } from '../../locales';
import { b } from '../../utils/bem';

const _block = 'dashboard-deposits';

export class DashboardDeposits extends Element {
  constructor() {
    super('div', { className: b(_block) });

    this.appendChild(new Header({ size: 1, text: t(strings.dashboard.accounts )}));
  }

  setAccounts(accounts: Account[]): void {
  }

/**
 * <div className={styles.container}>
                <div className={styles.header}>Accounts</div>

                {
                    this.props.accounts.map((item, i) => {
                        return (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.name}>{item.name}</div><div className={styles.amount}>{formatAmount(item.amount, item.currency)}</div>
                            </div>
                        );
                    })
                }
            </div>
 */