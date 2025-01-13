import React from 'react';
import styled from 'styled-components';

const CardsContainer = styled.div`
  background-color: #d0011b;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  margin:20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 18px; /* Matches title size */
  margin-bottom: 15px;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardText = styled.p`
  font-size: 16px; /* Adjusted for readability */
  margin: 0;
`;

const ActivateButton = styled.button`
  padding: 12px;
  background-color: #fff;
  color: #d0011b;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function Cards() {
  return (
    <CardsContainer>
      <CardTitle>Cards</CardTitle>
      <CardDetails>
        <CardText>**** **** **** 1234</CardText>
        <CardText>Full Name</CardText>
        <CardText>mm / yy</CardText>
        <ActivateButton>Activate Card</ActivateButton>
      </CardDetails>
    </CardsContainer>
  );
}

export default Cards;
