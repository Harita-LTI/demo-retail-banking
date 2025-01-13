import React,{useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { PiHandWithdrawLight, PiHandDepositLight } from "react-icons/pi";

const TransactionsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  justify-content: space-evenly;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Transaction = styled.div`
 display: flex;
    justify-content: space-between;
    padding: 12px 12px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    background: rgb(234, 234, 247);
    width: 100%;
    height: 100%
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionHead = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 12px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    background: white;
  &:last-child {
    border-bottom: none;
  }
`;

const NoTransactionHead = styled.div`
  display: flex;
  background: white;
  justify-content: space-evenly;
`

const TransactionName = styled.p`
  color: #333;
  display: flex;
  align-items: center;
`;

const TransactionAmount = styled.span`
  color: #888;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  color: black;
  display: flex;
  align-items: center;
`;

const Comment = styled.span`
  color: black;
  display: flex;
  align-items: center;
`;


const Amount = styled.span`
  color: black;
  display: flex;
  align-items: center;
`;

const ClosingTitle = styled.span`
  color: black;
  display: flex;
  align-items: center;
`;

const TransactionClosingBalance = styled.span`
  color: #888;
  display: flex;
  align-items: center;
`

const TransactionIcon = styled.p`
color: red;
  display: flex;
  align-items: center;
`

function Transactions() {
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    async function fetchTransList() {
      const token = localStorage.getItem('token');
    const customerId = token ? atob(token) : undefined;
      if(customerId) {
        await axios.get(`http://localhost:8080/api/simple/banking/history?customerId=${JSON.parse(customerId)}`)
        .then(res => {
          if (res.data.length) {
            let list = res.data;
            setTransList(list.reverse())
          }
        })
      }
    }
    fetchTransList();
  }, [])

  return (
    <TransactionsContainer>
        <TransactionHead>
          <Title>Type</Title>
          <Comment>Comment</Comment>
          <Amount>Amount</Amount>
          <ClosingTitle>Closing Balance</ClosingTitle>
        </TransactionHead>
      { transList.length ? transList.map(( el, i ) => (
        el.transactionType === "Deposit"?
        (<Transaction key={i}>
        <TransactionIcon><PiHandWithdrawLight size={25} color='green'/></TransactionIcon>
        <TransactionName>{el.transactionType} Successful</TransactionName>
        <TransactionAmount>{el.deposit}</TransactionAmount>
        <TransactionClosingBalance>{el.closingBalance}</TransactionClosingBalance>
      </Transaction>)
      : (<Transaction key={i}>
        <TransactionIcon><PiHandDepositLight size={25}  color='red'/></TransactionIcon>
        <TransactionName>{el.transactionType} Successful</TransactionName>
        <TransactionAmount>{el.withdraw}</TransactionAmount>
        <TransactionClosingBalance>{el.closingBalance}</TransactionClosingBalance>
      </Transaction>)
      )) : 
      <NoTransactionHead>
      <Comment>No Transaction Available</Comment>
      </NoTransactionHead>
      }     
    </TransactionsContainer>
     
  );
}

export default Transactions;
