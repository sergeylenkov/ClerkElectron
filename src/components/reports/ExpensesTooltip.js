import React from 'react';
import styled from 'styled-components';
import { formatAmount } from '../Utils.js';

const Container = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: column;

    background-color: #ffffff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`

const Header = styled.div`
    height: 20px;

    display: flex;
    flex-direction: row;
`

const Date = styled.div`
    margin: auto 20px auto 0;

    font-size: 12px;
    font-weight: bold;
`

const Total = styled.div`
    margin: auto 0 auto auto;

    font-size: 12px;
    font-weight: bold;
`

const Content = styled.div`
    margin: 10px 0 0 0;

    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    display: flex;
    flex-direction: row;
`

const Name = styled.div`
    margin: auto 20px auto 0;
    font-size: 12px;
`

const Amount = styled.div`
    margin: auto 0 auto auto;
    font-size: 12px;
`

export default class ExpensesTooltip extends React.Component {
    render() {
        const { active, payload } = this.props;

        if (active) {
            const { date, total, expenses } = payload[0].payload;
            const formattedDate = date.format('MMM YYYY');

            return (
                <Container>
                    <Header>
                        <Date>{formattedDate}</Date>
                        <Total>{formatAmount(total, 'RUB')}</Total>
                    </Header>
                    <Content>
                    {
                        expenses.map((item, i) => {
                            return (
                                <Item key={i}>
                                    <Name>{item.name}</Name>
                                    <Amount>{formatAmount(item.amount, 'RUB')}</Amount>
                                </Item>
                            );
                        })
                    }
                    </Content>
                </Container>
            )
        }

        return null;
    }
}