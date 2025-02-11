import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useAllAccountViewByUserIdQuery } from "../../services/adminServices";
import { RootState } from "../../store/store";
import { dateToDDMonYYYYTime } from "../../utils/utility";

const AccountsView = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const {
    data: accounts,
    error,
    isLoading,
  }: any = useAllAccountViewByUserIdQuery(user?.userId, { skip: !user });

  const handleOnClick = (status:string) => {
    if(status === "ACTIVE") {
      navigate("/user/dashboard")
    }
  }

  if(isLoading) return <div>Loading...</div>

  if(error || !accounts) return <div>Error Loading Accounts...</div>

  return (
    <div className="container">
      <Row>
        {accounts && [...accounts]?.reverse().map((account: any) => {
          const isActive = account.accountStatus === "ACTIVE";
          return (
            <Col 
              key={account.accountId} 
              xs={12} 
              sm={12} 
              md={6} 
              lg={4} 
              className="mb-4"
              onClick={isActive ? () => handleOnClick(account.accountStatus) : undefined}
              style={{ cursor: isActive ? 'pointer' : 'default' }}
            >
              <Card className="h-100 border-0" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
                <Card.Header 
                  className="text-white" 
                  style={{ backgroundColor: isActive ? "#1f6b6b" : "#a3abab" }}
                >
                  Account Number: {account.accountNumber}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Status: </strong>
                    <span style={{ color: (account.accountStatus === "ACTIVE") ? "green" : "" }} >{account.accountStatus}</span><br />
                    <strong>Type:</strong> {account.accountType}<br />
                    {
                      account.accountStatus === "ACTIVE" ? (
                        <span>
                          <strong>Opening Date: </strong>
                          {dateToDDMonYYYYTime(account.openingDate)}
                          <br />
                        </span>
                      ) : (
                        <span>
                          <strong>Closing Date: </strong>
                          {dateToDDMonYYYYTime(account.closingDate)}
                          <br />
                        </span>
                      )
                    }
                    <strong>Balance:</strong> {account.currency} {account.availableBalance}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

function AccountPage() {
  return (
    <LayoutWithSidebar title="All Accounts" icon={<FaBriefcase />}>
      <AccountsView />
    </LayoutWithSidebar>
  );
}
export default AccountPage;
