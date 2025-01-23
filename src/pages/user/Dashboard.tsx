import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import {
  FaArrowDown,
  FaArrowUp,
  FaExchangeAlt,
  FaHome,
  FaListOl,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useAccountViewByUserIdQuery } from "../../services/adminServices";
import { useGetStatementListQuery } from "../../services/userServices";
import { convertStingToDate } from "../../utils/utility";

interface UserDetailsCardProps {
  accountId: string
  balance: number
}

const UserDetailsCard = ({ accountId, balance }: UserDetailsCardProps) => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-IN", { hour12: false })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-IN", { hour12: false }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="mb-3 rounded-0">
      <Card.Body className="d-flex justify-content-between">
        <div>
          <Card.Title style={{ fontSize: "0.9rem" }} className="text-primary">
            <b>Account ID</b>
          </Card.Title>
          <Card.Text style={{ fontSize: "0.8rem" }}>{accountId}</Card.Text>
        </div>
        <div>
          <Card.Title style={{ fontSize: "0.9rem" }} className="text-primary">
            <b>Balance (INR)</b>
          </Card.Title>
          <Card.Text style={{ fontSize: "0.8rem" }}>{balance}</Card.Text>
        </div>
        <div>
          <Card.Title style={{ fontSize: "0.9rem" }} className="text-primary">
            <b>Current Time</b>
          </Card.Title>
          <Card.Text style={{ fontSize: "0.8rem" }}>
            {currentTime} IST
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

interface OptionCardProps {
  title: string;
  Icon: React.ComponentType;
  onClick: () => void;
}

const OptionCard = ({ title, Icon, onClick }: OptionCardProps) => (
  <Card
    className="text-center bg-light rounded-0"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <Card.Body>
      <span className="text-primary">
        <Icon />
      </span>
      <Card.Text>{title}</Card.Text>
    </Card.Body>
  </Card>
);

const QuickOptions = () => {
  const navigate = useNavigate();
  const handleOptionClick = (option: string) => {
    console.log(`${option} clicked`);

    if (option === "Statement") navigate("/user/Statement");
    else if (option === "Deposit") navigate("/user/deposit");
    else if (option === "Withdraw") navigate("/user/withdraw");
    else if (option === "Transfer") navigate("/user/transfer");
  };

  return (
    <Card className="mb-3 border-0">
      <Card.Body className="px-0 py-3 border-0">
        <Row>
          <Col>
            <OptionCard
              title="Statement"
              Icon={FaListOl}
              onClick={() => handleOptionClick("Statement")}
            />
          </Col>
          <Col>
            <OptionCard
              title="Deposit"
              Icon={FaMoneyBillWave}
              onClick={() => handleOptionClick("Deposit")}
            />
          </Col>
          <Col>
            <OptionCard
              title="Withdraw"
              Icon={FaMoneyBillWave}
              onClick={() => handleOptionClick("Withdraw")}
            />
          </Col>
          <Col>
            <OptionCard
              title="Transfer"
              Icon={FaExchangeAlt}
              onClick={() => handleOptionClick("Transfer")}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const RecentTransactions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: statementList, error, isLoading } = useGetStatementListQuery(2); // #check user.userId
  const reversedStatementList = statementList && [...statementList].reverse();

  const getTransactionTypeIcon = (type: string) => {
    if (type === 'DEBIT') {
      return <FaArrowUp className="text-danger" />;
    } else if (type === 'CREDIT') {
      return <FaArrowDown className="text-success" />;
    }
    return null;
  };

  return (
    <Card className="mb-3 border-0">
      <Card.Body className="px-0 py-3 border-0">
        <h5 className="fw-bold" style={{color:"#1f6b6b"}}>Recent Transactions</h5>
        <Row className="px-1">
          <Table hover>
            <thead>
              <tr className="text-primary">
                <th>Time</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Closing Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                reversedStatementList?.slice(0, 5).map((transaction) => (
                  <tr key={transaction.transactionID}>
                    <td>{convertStingToDate(transaction.createdDate)}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.transaction_amount}</td>
                    <td>{transaction.closingBalance}</td>
                    <td>{getTransactionTypeIcon(transaction.transactionType)}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading } = useAccountViewByUserIdQuery(2); //user.userId

  return (
    <>
      <UserDetailsCard accountId={accountInfo?.accountNumber} balance={accountInfo?.availableBalance} />
      <QuickOptions />
      <RecentTransactions />
    </>
  );
};

function DashboardPage() {
  return (
    <LayoutWithSidebar icon={<FaHome />} title="Hello, John Doe">
      <Dashboard />
    </LayoutWithSidebar>
  );
}
export default DashboardPage;
