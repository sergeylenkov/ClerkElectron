import React from 'react';
import moment from 'moment';
import TransactionsList from './List.js';

import data from '../../data/data.js';

import styles from './Transactions.module.css';

export default class Transactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        let from = moment().startOf('month');
        let to = moment().endOf('month');

        data.transactions.getTransactions(from.toISOString(), to.toISOString()).then(items => {
            console.log(items);
            this.setState({
                transactions: items
            })
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <TransactionsList transactions={this.state.transactions} />
            </div>
        )
    }
}