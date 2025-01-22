import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router";
import { useGetCustomerDetailsQuery } from "../../../services/customerServices";

function CustomerDetails() {
  const { userId } = useParams();
  const {
    data: user,
    error,
    isLoading,
  } = useGetCustomerDetailsQuery(userId, { skip: !userId });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customer details.</div>;
  const isCustomer = user !== undefined && user !== null ? true : false;
  return (
    <Container>
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start border-end">
          <h5 className="text-primary">
            <strong>{user.firstName + " " + user.lastName}</strong>
            <Badge bg="success" text="white" className="ms-1">
              <small>{user.userStatus}</small>
            </Badge>
          </h5>
          <p>
            <b>DOB: </b>
            {user.dateOfBirth}
          </p>
          <Button variant="primary" className="mt-2" size="sm">
            Create Account
          </Button>
        </Col>
        <Col md={9}>
          <Row className="border-bottom">
            <Col md={12}>
              <p className="text-primary mb-1">
                <b>Contact Details</b>
              </p>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Email</small>
                  </b>
                </p>
                <p>{user.emailId}</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Contact Number</small>
                  </b>
                </p>
                <p>{user.contact}</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Address</small>
                  </b>
                </p>
                <p>{user.address}</p>
              </div>
            </Col>
          </Row>
          <Row className="border-bottom mt-3">
            <Col md={12}>
              <p className="text-primary mb-1">
                <b>Identification Details</b>
              </p>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>PAN Number</small>
                  </b>
                </p>
                <p>{user.panNumber}</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Aaadhar Number</small>
                  </b>
                </p>
                <p>{user.aadharNumber}</p>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <p className="text-primary mb-1">
                <b>Accounts</b>
              </p>
            </Col>
            <Col>
              <div className="p-3 border bg-light">
                <p className="mb-0 text-primary" style={{ fontSize: "0.8rem" }}>
                  <small>Savings Account</small>
                </p>
                <p className="mb-2">
                  <b>1100023456</b>
                </p>
                <p>$25000</p>
                <Badge bg="success">Active</Badge>
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerDetails;
