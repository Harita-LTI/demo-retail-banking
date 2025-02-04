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
import { StatementInfo, useGetStatementListQuery } from "../../services/userServices";
import { dateToDDMonYYYYTime } from "../../utils/utility";

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
            <b>Account Number</b>
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

interface RecentTransactionsProps {
  statementList:StatementInfo[]|undefined
}

const RecentTransactions = (props:RecentTransactionsProps) => {

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
              {props.statementList && props.statementList.length > 0 ? (
                // props.statementList.slice(0, 5).map((transaction) => (
                  props.statementList.map((transaction) => (
                  <tr key={transaction.transactionID}>
                    <td>{dateToDDMonYYYYTime(transaction.createdDate)}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.transaction_amount}</td>
                    <td>{transaction.closingBalance}</td>
                    <td>{getTransactionTypeIcon(transaction.transactionType)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{"color": "#a4a1a1 !important"}}>No recent transaction</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Dashboard = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<number>(2);
  // const [totalPages, setTotalPages] = useState<number>(0);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading, refetch } = useAccountViewByUserIdQuery(user?.userId, {skip: !user});
  const { data: statementList, error:statementErr, isLoading:statementIsLoading, refetch:statementRefetch } = useGetStatementListQuery({userId:user?.userId, page:0, size: 5}, {skip: !user});
  let reversedStatementList:StatementInfo[]|undefined = statementList && [...statementList?.content].reverse();
  
  useEffect(() => {
    if(user) {
      refetch();
      statementRefetch();
    }
  }, [refetch, statementRefetch]);

  return (
    <>
      <UserDetailsCard accountId={accountInfo ? accountInfo.accountNumber : "No account present"} balance={accountInfo ? accountInfo.availableBalance : "0.00"} />
      <QuickOptions />
      <RecentTransactions statementList={reversedStatementList}/>
    </>
  );
};

function DashboardPage() {
  return (
    <LayoutWithSidebar icon={<FaHome />} title={"Hello"}>
      <Dashboard />
    </LayoutWithSidebar>
  );
}
export default DashboardPage;
