import React from 'react';
import moment from 'moment';
import { DashboardBalance } from './Balance';
import { DashboardDeposits } from './Deposits.js';
import { DashboardExpenses } from './Expenses.js';
import { DashboardBudgets } from './Budgets.js';
import { DashboardGoals } from './Goals.js';
import { DashboardDebts } from './Debts';
import { DashboardSchedulers } from './Schedulers.js';
import { convertExchangeRates } from '../Utils.js';

import data from '../../data/data.js';

import styles from './Dashboard.module.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ownFunds: [],
            creditFunds: [],
            accounts: [],
            expenses: [],
            budgets: [],
            goals: [],
            debts: [],
            schedulers: [],
            total: { amount: 0, currency: 'RUB' }
        }
    }

    componentDidMount() {
        data.exchange.rates().then(() => {
            data.dashboard.balance().then((items) => {
                const own = items.filter(el => !el.credit);
                const credits = items.filter(el => el.credit);

                let group = [];

                own.reduce((res, value) => {
                    if (!res[value.currency]) {
                        res[value.currency] = {
                            id: value.currency,
                            amount: 0,
                            currency: value.currency
                        };

                        group.push(res[value.currency])
                    }

                    res[value.currency].amount += value.amount;

                    return res;
                }, {});

                let total = 0;

                group.forEach((item) => {
                    total = total + convertExchangeRates(item.currency, 'RUB', item.amount);
                });

                this.setState({
                    ownFunds: group,
                    creditFunds: credits,
                    accounts: items,
                    total: { amount: total, currency: 'RUB' }
                });
            });
        });

        let from = moment().startOf('month');
        let to = moment().endOf('month');

        data.dashboard.expenses(from.toISOString(), to.toISOString()).then((expenses) => {
            this.setState({
                expenses: expenses
            });
        });

        data.dashboard.budgets(from.toISOString(), to.toISOString()).then((budgets) => {
            this.setState({
                budgets: budgets
            });
        });

        data.dashboard.goals().then((goals) => {
            this.setState({
                goals: goals
            });
        });

        data.dashboard.debts().then((debts) => {
            this.setState({
                debts: debts
            });
        });

        from = moment();
        to = moment().add(31, 'd');

        data.dashboard.schedulers(from.toISOString(), to.toISOString()).then((schedulers) => {
            this.setState({
                schedulers: schedulers
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <DashboardBalance total={this.state.total} own={this.state.ownFunds} credits={this.state.creditFunds} />
                    <DashboardDeposits accounts={this.state.accounts} />
                    <DashboardExpenses expenses={this.state.expenses} />
                </div>
                <div className={styles.right}>
                    <DashboardSchedulers schedulers={this.state.schedulers} />
                    <DashboardBudgets budgets={this.state.budgets} />
                    <DashboardGoals goals={this.state.goals} />
                    <DashboardDebts debts={this.state.debts} />
                </div>
            </div>
        );
    }
}