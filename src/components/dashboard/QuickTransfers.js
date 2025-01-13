import React from 'react';
import styled from 'styled-components';

const QuickTransfersContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TransferTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const TransferForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #d0011b;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b80018;
  }
`;

function QuickTransfers() {
  return (
    <QuickTransfersContainer>
      <TransferTitle>Quick Transfers</TransferTitle>
      <TransferForm>
        <Label>From</Label>
        <Select><option>Select Account</option></Select>
        <Label>To</Label>
        <Select><option>Select Account</option></Select>
        <Label>Amount</Label>
        <Input type="number" placeholder="Amount" />
        <Button type="submit">Transfer</Button>
      </TransferForm>
    </QuickTransfersContainer>
  );
}

export default QuickTransfers;
