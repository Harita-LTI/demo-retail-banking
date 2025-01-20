import React, { useEffect, useState } from "react";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { Card, Col, Row } from "react-bootstrap";
import { FaCreditCard, FaExchangeAlt, FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface UserDetailsCardProps {
  accountId: string;
}

const UserDetailsCard = ({ accountId }:UserDetailsCardProps) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-IN', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between">
        <div>
          <Card.Title style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#6a6767' }}>Account ID</Card.Title>
          <Card.Text style={{ fontSize: '0.8rem', color: '#6C757D' }}>{accountId}</Card.Text>
        </div>
        <div>
          <Card.Title style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#6a6767' }}>Current Time</Card.Title>
          <Card.Text style={{ fontSize: '0.8rem', color: '#6C757D' }}>{currentTime} IST</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

interface OptionCardProps {
  title: string
  Icon: React.ComponentType
  onClick: () => void
}

const OptionCard = ({ title, Icon, onClick }:OptionCardProps) => (
  <Card className="text-center" onClick={onClick} style={{ cursor: 'pointer' }}>
    <Card.Body>
      <Icon />
      <Card.Text style={{ fontSize: '0.9rem', color: '#6C757D', marginTop: '10px' }}>{title}</Card.Text>
    </Card.Body>
  </Card>
);

const QuickOptions = () => {
  const navigate = useNavigate();
  const handleOptionClick = (option: string) => {
    console.log(`${option} clicked`);
    
    if(option === "Transaction")
      navigate("/")
    else if(option === "Deposit")
      navigate("/user/deposit")
    else if(option === "Withdraw")
      navigate("/user/withdraw")
    else if(option === "Transfer")
      navigate("/")
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col>
            <OptionCard
              title="Transaction"
              Icon={FaExchangeAlt}
              onClick={() => handleOptionClick('Transaction')}
            />
          </Col>
          <Col>
            <OptionCard
              title="Deposit"
              Icon={FaMoneyCheckAlt}
              onClick={() => handleOptionClick('Deposit')}
            />
          </Col>
          <Col>
            <OptionCard
              title="Withdraw"
              Icon={FaMoneyBillWave}
              onClick={() => handleOptionClick('Withdraw')}
            />
          </Col>
          <Col>
            <OptionCard
              title="Transfer"
              Icon={FaCreditCard}
              onClick={() => handleOptionClick('Cards')}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Dashboard = () => {
  return(
    <>
      <UserDetailsCard accountId={"123456789142"}/>
      <QuickOptions />
    </>
  )
}

function DashboardPage() {
  return (
    <LayoutWithSidebar
      title="Hello, John Doe"
    >
      <Dashboard />
    </LayoutWithSidebar>
  );
}
export default DashboardPage;