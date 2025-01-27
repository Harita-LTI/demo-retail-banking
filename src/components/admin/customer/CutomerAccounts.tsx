import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router";
import { useAccountViewByUserIdQuery } from "../../../services/adminServices";
import ConfirmModal from "../../common/ConfirmModal";
import PlaneModalForNotification from "../../common/PlaneModalForNotification";
import { toTitleCase } from "../../../utils/utility";

const CustomerAccounts = ({ disableButton, newAccountAdded }: any) => {
  const { userId }: any = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [buttonText, setButtonText] = useState("Close Account");

  const handleButtonClick = () => {
    if (account.availableBalance > 0) setShowModal(true);
    else setShowConfirmModal(true);
  };

  const handleOkClick = () => {
    setShowConfirmModal(false);
    setButtonText("Closing...");
  };

  const handleCancelClick = () => {
    setShowConfirmModal(false);
  };

  const {
    data: account,
    error,
    isLoading,
    refetch,
  }: any = useAccountViewByUserIdQuery(userId, { skip: !userId });

  useEffect(() => {
    if (newAccountAdded) refetch(); // This will re-execute the query when the props change
  }, [newAccountAdded, refetch]);

  useEffect(() => {
    if (error && error.status === 404) {
      disableButton(false);
    } else {
      disableButton(true);
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  if (error && error.status === 404)
    return (
      <div className="text-red">
        No account found. You can create one using Create Account button.
      </div>
    );
  if (error && error.status !== 404)
    return (
      <div className="text-red">
        Error loading customer account details. Please try again.
      </div>
    );

  return (
    <>
      <Col>
        <div className="p-3 border bg-light">
          <p className="mb-0 text-primary d-flex justify-content-between w-100">
            <small style={{ fontSize: "0.85rem" }}>
              {toTitleCase(account.accountType)} Account
            </small>
            <Badge bg="success" className="lh-base text-white">
              {account.accountStatus}
            </Badge>
          </p>
          <p className="mb-2">
            <b>{account.accountNumber}</b>
          </p>
          <p>{account.currency + " " + account.availableBalance}</p>
          <Button
            size="sm"
            variant="danger"
            title="Close Account"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </Col>
      <Col></Col>
      <Col></Col>
      <ConfirmModal
        bodyMessage={
          "Are you sure you want to close the account " +
          account.accountNumber +
          "?"
        }
        setShowModal={() => setShowConfirmModal}
        showModal={showConfirmModal}
        handleYes={handleOkClick}
        handleNo={handleCancelClick}
      />
      <PlaneModalForNotification
        bodyMessage={"Balance must be zero, Before closing  account."}
        title="Not Allowed"
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

export default CustomerAccounts;
