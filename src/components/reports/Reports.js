import React from 'react';
import { LineChart, Line } from 'recharts';
import moment from 'moment';

import data from '../../data/data.js';

import styles from './Reports.module.css';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let from = moment().startOf('month');
        let to = moment().endOf('month');

        from = from.subtract(6, 'months');

        data.reports.getExpensesByMonth(from.toISOString(), to.toISOString()).then((data) => {
            console.log(data);
            this.setState({
                data: data,
            });
        });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.filter}>

                </div>
                <div className={styles.content}>
                    <LineChart width={800} height={600} data={this.state.data}>
                        <Line type="monotone" dataKey="sum" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>
        )
    }
}