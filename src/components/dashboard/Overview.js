import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const OverviewContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: space-between;
  border-radius: 8px;
`;

const AccountBalance = styled.div`
  background-color: #fff;
  padding: 20px;
  flex:0.5;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const BalanceAmount = styled.h2`
  color: #333;
`;

const BalanceLabel = styled.p`
  color: #888;
`;

function Overview() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const custId = token ? atob(token) : undefined;
        if(custId)
          await axios.get(`http://localhost:8080/api/simple/banking/balance/${JSON.parse(custId)}`).then(res => {
            setBalance(res.data)
          })
      } catch (err) {
        console.log('Error fetching balance', err);
      }
    }
    fetchData();
  }, [])

  return (
    <OverviewContainer>
      <AccountBalance>
        <BalanceAmount>₹ {balance}</BalanceAmount>
        <BalanceLabel>Balance</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 0</BalanceAmount>
        <BalanceLabel>Credit Card</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 0</BalanceAmount>
        <BalanceLabel>Loan Amount</BalanceLabel>
      </AccountBalance>
      <AccountBalance>
        <BalanceAmount>₹ 0</BalanceAmount>
        <BalanceLabel>Mortgage</BalanceLabel>
      </AccountBalance>
    </OverviewContainer>
  );
}

export default Overview;
