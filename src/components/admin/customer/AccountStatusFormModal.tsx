import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const AccountStatusFormModal = ({
  accNo,
  show,
  handleClose,
  handleConfirm,
  freez,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedReason, setSelectedReason] = useState("");

  useEffect(() => {
    // Set the first option as selected when the component mounts
    setSelectedReason("Account Inactivity");
  }, []);

  const onSubmit = (data: any) => {
    handleConfirm(data.reason ? data.reason : "Unfreeze");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to {freez ? "freez" : "unfreeze"} the account{" "}
            {accNo}?
          </p>
          {freez && (
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
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Security Concerns">Security Concerns</option>
                <option value="Regulatory Non-Compliance">
                  Regulatory Non-Compliance
                </option>
                <option value="Court Orders">Court Orders</option>
              </Form.Control>
              {errors.dropdown1 && <span>Please provide a reason</span>}
            </Form.Group>
          )}
          {!freez && (
            <Form.Control
              type="hidden"
              value="Unfreeze"
              {...register("reason")}
            />
          )}
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

export default AccountStatusFormModal;
