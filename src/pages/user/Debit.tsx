import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useWithdrawMutation } from "../../services/userServices";
import PlaneModalForNotification from "../../components/common/PlaneModalForNotification";
import { RootState } from "../../store/store";
import { useAccountViewByUserIdQuery } from "../../services/adminServices";

const Debit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch
  } = useForm();
  const [ withdraw, {}] = useWithdrawMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [apiError, setApiError] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: accountInfo, error, isLoading: accountInfoIsLoading } = useAccountViewByUserIdQuery(user?.userId, {skip: !user});

  const onSubmit = async (formData: any) => {
    setApiError(null);

    if (formData.amount % 100 !== 0 && formData.amount % 200 !== 0 && formData.amount % 500 !== 0) {
      setError('amount', {
        type: 'manual',
        message: 'The amount should be a multiple of 100, 200, or 500.',
      });
      return;
    }
    try {
      const resp = await withdraw({
        userId: user.userId,
        amount: JSON.parse(formData.amount)
      }).unwrap();

      if(resp && resp.transactionId) {
        setModalMessage(resp.message || 'Transaction successful!');
        setShowModal(true);
        reset();
      }
    } catch (err) {
      //@ts-ignore
      setApiError(err.data || "Transaction failed")
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {accountInfo && (
          <Form.Group controlId="accountNumber" className="py-2" style={{ color: "grey" }}>
            <Form.Label>{`Transfer From: ${accountInfo?.accountNumber}`}</Form.Label>
          </Form.Group>
        )}
        {<p className="text-red m-0">{apiError}</p>}
        <div className="d-flex">
          <Form.Group controlId="amount" className="py-2 me-2" style={{ flex: 1 }}>
            <Form.Label>
              Please enter the amount <span className="text-danger">*</span>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>The amount should be a multiple of 100, 200, or 500.</Tooltip>}
              >
                <span className="ml-2 text-info">ℹ️</span>
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="number"
              autoComplete="off"
              {...register("amount", {
                required: "You must provide the amount.",
              })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.amount?.message === "string" && errors.amount.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="remarks" className="py-2 ms-2" style={{ flex: 1 }}>
            <Form.Label>Remark</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
            />
          </Form.Group>
        </div>
        <Form.Group controlId="terms" className="py-2">
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            {...register('terms', { required: "You must agree to the terms and conditions." })}
            isInvalid={!!errors.terms}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                (e.target as HTMLInputElement).click();
              }
            }}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.terms?.message === 'string' && errors.terms.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit" disabled={!watch('terms') || !watch('amount')}>Submit</Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Form.Group>
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

function DebitPage() {
  return (
    <LayoutWithSidebar title="Withdrawal" icon={<FaMoneyBillAlt />}>
      <Debit />
    </LayoutWithSidebar>
  );
}
export default DebitPage;
