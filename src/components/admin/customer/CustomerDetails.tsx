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
        <Col md={3} className="d-flex flex-column align-items-start border-end">
          <h5 className="text-primary d-flex justify-content-between w-100">
            <strong>{user.firstName + " " + user.lastName}</strong>
            <Badge bg="success" text="white" className="ms-1">
              <small>{user.userStatus}</small>
            </Badge>
          </h5>
          <p className="">{generateCustomerId(user.id)}</p>
          <span className={createButtonClass}>
            <Button
              variant="primary"
              className={"mt-2"}
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
              <p className="text-primary mb-1">
                <b>Accounts</b>
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
