import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router";
import {
  //useAccountViewByUserIdQuery,
  useAllAccountViewByUserIdQuery,
  useCloseAccountByAccountNumberMutation,
} from "../../../services/adminServices";
import ConfirmModal from "../../common/ConfirmModal";
import PlaneModalForNotification from "../../common/PlaneModalForNotification";
import { getBgClass, toTitleCase } from "../../../utils/utility";
import CloseAccountFormModal from "./CloseAccountFormModal";

const CustomerAccounts = ({ disableButton, newAccountAdded }: any) => {
  const { userId }: any = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [buttonText, setButtonText] = useState("Close Account");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedAccount, setSelectedAccount]: any = useState(null);
  const [closeAccount, { isLoading: accountLoading, isError }] =
    useCloseAccountByAccountNumberMutation();

  const {
    data: accounts,
    error,
    isLoading,
    refetch,
  }: any = useAllAccountViewByUserIdQuery(userId, { skip: !userId });
  const userAccounts = accounts
    ? Array.isArray(accounts)
      ? [...accounts]
      : [accounts]
    : [];

  const handleButtonClick = async (account: any) => {
    // if (account.availableBalance > 0) {
    //   await setModalMessage("Balance must be zero, Before closing  account.");
    //   setShowModal(true);
    // } else
    await setSelectedAccount(account);
    setShowConfirmModal(true);
  };

  const handleOkClick = async () => {
    setShowConfirmModal(false);
    setButtonText("Closing...");
    if (selectedAccount && selectedAccount.accountNumber) {
      try {
        const resp = await closeAccount(selectedAccount.accountNumber).unwrap();
        refetch();
        setShowModal(true);
        setModalMessage("Account Closed Successfully");
        setButtonText("Close Account");
        setTimeout(() => {
          setShowModal(false);
          //navigate("/admin/customer-details/" + userId);
        }, 2000);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Account not found");
    }
  };

  const handleCancelClick = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    if (newAccountAdded) refetch(); // This will re-execute the query when the props change
  }, [newAccountAdded, refetch]);

  useEffect(() => {
    const hasActiveAccount = userAccounts.some(
      (account) => account.accountStatus === "ACTIVE"
    );
    if (!hasActiveAccount) {
      disableButton(false);
    } else {
      disableButton(true);
    }
  }, [userAccounts]);

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
  const accountsSection: any = () => {
    return (
      <>
        {userAccounts.map((account: any) => (
          <Col md={4}>
            <div className="p-3 border bg-light h-100">
              <p className="mb-0 text-primary d-flex justify-content-between w-100">
                <small style={{ fontSize: "0.85rem" }}>
                  {toTitleCase(account.accountType)} Account
                </small>
                <Badge
                  bg={getBgClass(account.accountStatus)}
                  className="lh-base text-white"
                >
                  {account.accountStatus}
                </Badge>
              </p>
              <p className="mb-2">
                <b>{account.accountNumber}</b>
              </p>
              <p>{account.currency + " " + account.availableBalance}</p>
              {account.accountStatus !== "CLOSED" && (
                <Button
                  size="sm"
                  variant="danger"
                  title="Close Account"
                  onClick={() => {
                    handleButtonClick(account);
                  }}
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </Col>
        ))}
      </>
    );
  };
  return (
    <React.Fragment>
      {accountsSection()}
      {/* <ConfirmModal
        bodyMessage={
          "Are you sure you want to close the account " +
          selectedAccount?.accountNumber +
          "?"
        }
        setShowModal={() => setShowConfirmModal}
        showModal={showConfirmModal}
        handleYes={handleOkClick}
        handleNo={handleCancelClick}
      /> */}
      <CloseAccountFormModal
        accNo={
          selectedAccount?.accountNumber ? selectedAccount?.accountNumber : ""
        }
        show={showConfirmModal}
        handleClose={handleCancelClick}
        handleConfirm={handleOkClick}
      />
      <PlaneModalForNotification
        bodyMessage={modalMessage}
        title="Not Allowed"
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </React.Fragment>
  );
};

export default CustomerAccounts;
