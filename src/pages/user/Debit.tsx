import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { useWithdrawMutation } from "../../services/userServices";
import PlaneModalForNotification from "../../components/common/PlaneModalForNotification";

const Debit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm();
  const [ withdraw, {}] = useWithdrawMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (formData: any) => {
    if (formData.amount % 100 !== 0 && formData.amount % 200 !== 0 && formData.amount % 500 !== 0) {
      setError('amount', {
        type: 'manual',
        message: 'The amount should be a multiple of 100, 200, or 500.',
      });
      return;
    }
    try {
      const resp = await withdraw({
        userId: "2",
        amount: JSON.parse(formData.amount)
      }).unwrap();

      setModalMessage(resp.message || 'Transaction successful!');
      setShowModal(true);
      reset();

      setTimeout(() => {
        setShowModal(false);
        navigate('/user/dashboard');
      }, 3000);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="amount" className="py-2">
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
            className="transaction-input-field"
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.amount?.message === "string" &&
              errors.amount.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-4">
          <Button type="submit">Submit</Button>
          <Button
            type="button"
            className="ms-2"
            variant="danger"
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>

      <PlaneModalForNotification
        bodyMessage={modalMessage}
        title="Transaction Status"
        showModal={showModal}
        setShowModal={() => setShowModal}
      />

      {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
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
