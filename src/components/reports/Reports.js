import React from 'react';
import moment from 'moment';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import { formatAmount } from '../Utils.js';

import data from '../../data/data.js';

import styles from './Reports.module.css';

export default class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            width: 100,
            height: 100
        }

        this.contentElement = null;

        this.refContentCallback = element => {
            this.contentElement = element;
            this.calculateReportPosition();
        }

        let from = moment().startOf('month');
        let to = moment().endOf('month');

        from.subtract(6, 'months');

        data.reports.getExpensesByMonth(from, to).then((data) => {
            data.forEach(item => {
                const date = item.date;

                if (date.year() === moment().year()) {
                    item.formattedDate = date.format('MMM');
                } else {
                    item.formattedDate = date.format('MMM YYYY');
                }
            });
            console.log(data);
            this.setState({
                data: data,
            });
        });

        this.updateDimensions = this.updateDimensions.bind(this)
        this.getTooltip = this.getTooltip.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    render() {
        const reportStyle = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }

        return (
            <div className={styles.container}>
                <div className={styles.filter}>

                </div>
                <div className={styles.content} ref={this.refContentCallback}>
                    <div className={styles.report} style={reportStyle}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.state.data}>
                                <Line dataKey="total" stroke="#2196f3" isAnimationActive={false} />
                                <Tooltip content={this.getTooltip} />
                                <XAxis dataKey="formattedDate" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }

    getTooltip(data) {
        if (data && data.active) {
            const payload = data.payload[0].payload;
            const formattedDate = payload.date.format('MMM YYYY');

            return (
                <div className={styles.tooltip}>
                    <div className={styles.tooltipHeader}>
                        <div className={styles.tooltipDate}>{formattedDate}</div>
                        <div className={styles.tooltipTotal}>{formatAmount(payload.total, 'RUB')}</div>
                    </div>
                    <div className={styles.tooltipContent}>
                    {
                        payload.expenses.map((item, i) => {
                            return (
                                <div key={i} className={styles.tooltipItem}>
                                    <div className={styles.tooltipName}>{item.name}</div>
                                    <div className={styles.tooltipAmount}>{formatAmount(item.amount, 'RUB')}</div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            )
        }

        return '';
    }

    calculateReportPosition() {
        if (this.contentElement) {
            const rect = this.contentElement.getBoundingClientRect();
            let height = rect.height;

            if (height > 600) {
                height = 600;
            }

            this.setState({
                width: rect.width - 40,
                height: height
            });
        }
    }

    updateDimensions() {
        this.calculateReportPosition();
    }
}