import React, { useEffect, useState } from "react";
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
    handleConfirm(data.reason);
    handleClose();
  };

  const [selectedReason, setSelectedReason] = useState("");

  useEffect(() => {
    // Set the first option as selected when the component mounts
    setSelectedReason("Account Inactivity");
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to close the account {accNo}?</p>
          <Form.Group controlId="reason">
            <Form.Label>Reason:</Form.Label>
            <Form.Control
              as="select"
              {...register("reason", { required: true })}
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="form-select"
            >
              <option value="Requested By Customer">
                Requested By Customer
              </option>
              <option value="Account Inactivity">Account Inactivity</option>
              <option value="Violation of Terms">Violation of Terms</option>
              <option value="Fraud">Fraud</option>
              <option value="Customer Relocation">Customer Relocation</option>
            </Form.Control>
            {errors.dropdown1 && <span>Please provide a reason</span>}
          </Form.Group>
          <Form.Group controlId="dropdown2" className="mt-2">
            <Form.Label>Balance Transfer Mode:</Form.Label>
            <Form.Control
              as="select"
              {...register("dropdown2", { required: true })}
              className="form-select"
            >
              <option value="DD">DD</option>
              {/* <option value="option2">Cash Withdrawal</option>
              <option value="option2">Transferred to another account</option> */}
            </Form.Control>
            {errors.dropdown2 && <span>This field is required</span>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CloseAccountFormModal;
