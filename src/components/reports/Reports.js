import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, XAxis, CartesianGrid } from 'recharts';
import ExpensesTooltip from './ExpensesTooltip';

import data from '../../data/data.js';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const FilterContainer = styled.div`
    width: 100%;
    height: 40px;

    flex-shrink: 0;
`

const Content = styled.div`
    width: 100%;

    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
`

const ReportContainer = styled.div`
    width: 600px;
    height: 600px;

    margin: auto;

    font-size: 12px;
`

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

        this.updateDimensions = this.updateDimensions.bind(this);
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
            <Container>
                <FilterContainer>
                </FilterContainer>
                <Content ref={this.refContentCallback}>
                    <ReportContainer style={reportStyle}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.state.data}>
                                <Line dataKey="total" stroke="#2196f3" isAnimationActive={false} />
                                <Tooltip content={<ExpensesTooltip />} isAnimationActive={false} />
                                <XAxis axisLine={false} tickSize={4} dataKey="formattedDate" />
                                <YAxis axisLine={false} tickSize={4} />
                                <CartesianGrid strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </ReportContainer>
                </Content>
            </Container>
        )
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