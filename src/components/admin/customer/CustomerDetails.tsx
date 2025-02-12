import React, { useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useGetCustomerDetailsQuery } from "../../../services/customerServices";
import CustomerAccounts from "./CutomerAccounts";
import { useCreateAccountMutation } from "../../../services/adminServices";
import PlaneModalForNotification from "../../common/PlaneModalForNotification";
import showError from "../../../utils/error";
import { generateCustomerId } from "../../../utils/utility";
import AccountCreateFormModal from "./AccountCreateFormModal";
import CustomerImage from "./customer-details/CustomerImage";

function CustomerDetails() {
  const { userId } = useParams();
  const {
    data: user,
    error,
    isLoading,
  } = useGetCustomerDetailsQuery(userId, { skip: !userId });
  const [createAccount, { isLoading: accountLoading, isError }] =
    useCreateAccountMutation();
  const [showCreateButton, setShowCreateButton] = useState(true);
  const [newAccountAdded, setNewAccountAdded] = useState(false);
  const [createButtonClass, setCtreateButtonClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const disableButton = (status: boolean) => {
    if (status) {
      setShowCreateButton(false);
      setCtreateButtonClass(" not-allowed");
    } else {
      setShowCreateButton(true);
      setCtreateButtonClass("");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div className="text-red">{showError("customer-details-get")}</div>;

  const handleCreateAccountCancel = () => {
    setShowCreateModal(false);
  };

  const handleCreateAccountConfirm = async (accountType: string) => {
    if (userId) {
      try {
        const accData = {
          userId: parseInt(userId ? userId : "0"),
          accountType: accountType,
          currency: "INR",
        };
        const resp = await createAccount(accData).unwrap();
        setNewAccountAdded(true);
        setModalMessage("Account Created Successfully");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          //navigate("/admin/customer-details/" + userId);
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("userId not found");
    }
  };
  return (
    <Container>
      <Row>
        <Col
          md={3}
          className="d-flex flex-column align-items-center border-end pt-4"
        >
          <CustomerImage src={null} gender={user.gender} />
          <Badge bg="success" text="white" className="customer-status">
            <small>{user.userStatus}</small>
          </Badge>
          <h5 className="text-primary w-auto mt-3 mb-0 customer-name">
            <strong>{user.firstName + " " + user.lastName}</strong>
          </h5>
          <p className="mt-0 mb-2 text-secondary">
            <small className="font-8">{user.gender}</small>
          </p>
          <p className="mt-0 mb-1">
            <small>{"Customer Id: " + generateCustomerId(user.id)}</small>
          </p>
          <span className={createButtonClass}>
            <Button
              variant="primary"
              className={"mt-1"}
              size="sm"
              disabled={!showCreateButton}
              onClick={() => setShowCreateModal(true)}
            >
              {accountLoading ? "Creating..." : "Create Account"}
            </Button>
          </span>
        </Col>
        <Col md={9}>
          <Row className="border-bottom">
            <Col md={12}>
              <p className="text-primary mb-1 details-heading">
                <span>Contact Details</span>
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
              <p className="text-primary mb-1 details-heading">
                <span>Identification Details</span>
              </p>
            </Col>
            <Col>
              <div className="p-1">
                <p className="mb-0">
                  <b>
                    <small>Date of Birth</small>
                  </b>
                </p>
                <p>{user.dateOfBirth}</p>
              </div>
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
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <p className="text-primary mb-1 details-heading">
                <span>Accounts</span>
              </p>
            </Col>
            <CustomerAccounts
              disableButton={disableButton}
              newAccountAdded={newAccountAdded}
            />
          </Row>
        </Col>
      </Row>
      <PlaneModalForNotification
        bodyMessage={modalMessage}
        title="Notification"
        setShowModal={() => setShowModal}
        showModal={showModal}
      />
      <AccountCreateFormModal
        show={showCreateModal}
        handleClose={handleCreateAccountCancel}
        handleConfirm={handleCreateAccountConfirm}
      />
    </Container>
  );
}

export default CustomerDetails;
