import React from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

function CustomerDetails() {
  return (
    <Container>
      <Row>
        <Col md={3} className="d-flex flex-column align-items-start border-end">
          <h5 className="text-primary">
            <strong>Harita Jadeja</strong>{" "}
            <Badge bg="success" text="white">
              Active
            </Badge>
          </h5>
          <p>
            <b>DOB:</b>19-11-1989
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
                <p>abc@gmail.com</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Contact Number</small>
                  </b>
                </p>
                <p>123456</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Address</small>
                  </b>
                </p>
                <p>21, street name, area, City - 000 000</p>
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
                <p>abc@gmail.com</p>
              </div>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Aaadhar Number</small>
                  </b>
                </p>
                <p>123456</p>
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
                <p className="mb-0">
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
