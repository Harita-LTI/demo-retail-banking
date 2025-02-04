import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const CloseAccountFormModal = ({
  accNo,
  show,
  handleClose,
  handleConfirm,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    handleConfirm(data);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to close the account {accNo}?</p>
          <Form.Group controlId="dropdown1">
            <Form.Label>Reason:</Form.Label>
            <Form.Control
              as="select"
              {...register("dropdown1", { required: true })}
            >
              <option value="option1">Requested By Customer</option>
              <option value="option2">Account Inactivity</option>
              <option value="option3">Violation of Terms</option>
              <option value="option4">Fraud</option>
              <option value="option5">Customer Relocation</option>
            </Form.Control>
            {errors.dropdown1 && <span>This field is required</span>}
          </Form.Group>
          <Form.Group controlId="dropdown2" className="mt-2">
            <Form.Label>Balance Transfer Mode:</Form.Label>
            <Form.Control
              as="select"
              {...register("dropdown2", { required: true })}
            >
              <option value="option1">DD</option>
              <option value="option2">Cash Withdrawal</option>
              <option value="option2">Transferred to another account</option>
            </Form.Control>
            {errors.dropdown2 && <span>This field is required</span>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CloseAccountFormModal;
