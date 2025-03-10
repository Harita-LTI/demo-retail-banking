import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaMoneyBill } from "react-icons/fa";
import {
  useGetAllActiveAccountsQuery,
  useTransferMutation,
} from "../../services/userServices";
import { useNavigate } from "react-router";
import PlaneModalForNotification from "../../components/common/PlaneModalForNotification";
import { RootState } from "../../store/store";
import { useAccountViewByUserIdQuery } from "../../services/adminServices";

const TransferForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [transfer, {}] = useTransferMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: accountInfo,
    error,
    isLoading: accountInfoIsLoading,
  } = useAccountViewByUserIdQuery(user?.userId, { skip: !user });
  const {
    data: allAccounts,
    error: allAccountsErr,
    isLoading: allAccountsIsLoading,
  } = useGetAllActiveAccountsQuery({});

  if (allAccounts) {
    var accountNumbers = allAccounts.map(
      (account: any) => account.accountNumber
    );
  }

  const onSubmit = async (formData: any) => {
    try {
      const resp = await transfer({
        receiverAccount: formData.otherBankAccount,
        senderAccount: formData.ownAccount,
        amount: JSON.parse(formData.amount),
      }).unwrap();

      //@ts-ignore
      setModalMessage(resp.message || "Transaction successful!");
      setShowModal(true);
      reset();

      setTimeout(() => {
        setShowModal(false);
        navigate("/user/dashboard");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  if (accountInfoIsLoading || allAccountsIsLoading) {
    return <div>Loading...</div>;
  }

  if (error || allAccountsErr) {
    return <div>Error loading account information.</div>;
  }

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex">
          <Form.Group controlId="bank1IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              disabled={true}
              defaultValue={"UNBK0000007"}
              {...register("bank1IFSC")}
            />
          </Form.Group>
          <Form.Group controlId="ownAccount" className="py-2 w-100">
            <Form.Label>{`Transfer From`}</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              disabled={true}
              defaultValue={accountInfo?.accountNumber}
              {...register("ownAccount", {
                required: "You must provide your own account number.",
              })}
              isInvalid={!!errors.ownAccount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.ownAccount?.message === "string" &&
                errors.ownAccount.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group controlId="bank2IFSC" className="py-2 me-2 w-100">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              disabled={true}
              defaultValue={"UNBK0000007"}
              {...register("bank2IFSC")}
            />
          </Form.Group>
          <Form.Group controlId="otherBankAccount" className="py-2 w-100">
            <Form.Label>Transfer To</Form.Label>
            <Form.Control
              as="select"
              autoComplete="off"
              {...register("otherBankAccount", {
                required: "You must provide the other bank account number.",
              })}
              isInvalid={!!errors.otherBankAccount}
            >
              <option value="">Select an account number</option>
              {accountNumbers &&
                accountNumbers.map((number: string, index: number) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {typeof errors.otherBankAccount?.message === "string" &&
                errors.otherBankAccount.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group
            controlId="amount"
            className="py-2 me-2"
            style={{ flex: 1 }}
          >
            <Form.Label>Transfer Amount</Form.Label>
            <Form.Control
              type="number"
              autoComplete="off"
              {...register("amount", {
                required: "You must provide the amount.",
              })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.amount?.message === "string" &&
                errors.amount.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            controlId="remarks"
            className="py-2 ms-2"
            style={{ flex: 1 }}
          >
            <Form.Label>Remark</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              {...register("remarks", {
                required: "You must provide a remark or comment.",
              })}
              isInvalid={!!errors.remarks}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.remarks?.message === "string" &&
                errors.remarks.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group controlId="paymentMode" className="py-2">
          <Form.Label>Transfer Mode</Form.Label>
          <div className="d-flex">
            {["IMPS", "NEFT", "RTGS"].map((mode, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={mode}
                value={mode}
                defaultChecked={mode === "IMPS"}
                {...register("paymentMode", {
                  required: "You must select a payment mode.",
                })}
                className="me-3"
              />
            ))}
          </div>
        </Form.Group>
        <Form.Group controlId="terms" className="py-2">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            {...register("terms", {
              required: "You must agree to the terms and conditions.",
            })}
            isInvalid={!!errors.terms}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                (e.target as HTMLInputElement).click();
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.terms?.message === "string" && errors.terms.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button
            type="submit"
            disabled={
              !watch("remarks") ||
              !watch("otherBankAccount") ||
              !watch("amount") ||
              !watch("terms")
            }
          >
            Submit
          </Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Form.Group>
        <div className="mt-5" style={{ color: "grey", fontSize: "12px" }}>
          <strong>NOTE:</strong>
          <ul>
            <li>
              <strong>IMPS:</strong> Immediate Payment Service
            </li>
            <li>
              <strong>NEFT:</strong> National Electronic Funds Transfer
            </li>
            <li>
              <strong>RTGS:</strong> Real Time Gross Settlement
            </li>
          </ul>
        </div>
      </Form>

      <PlaneModalForNotification
        bodyMessage={modalMessage}
        title="Transaction Status"
        showModal={showModal}
        setShowModal={() => setShowModal}
      />
    </div>
  );
};

function TransferPage() {
  return (
    <LayoutWithSidebar title="Unity Bank Money Transfer" icon={<FaMoneyBill />}>
      <TransferForm />
    </LayoutWithSidebar>
  );
}
export default TransferPage;
