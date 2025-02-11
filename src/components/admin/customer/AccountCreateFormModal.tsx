import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const AccountCreateFormModal = ({ show, handleClose, handleConfirm }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    // Set the first option as selected when the component mounts
    setSelectedType("Saving");
  }, []);

  const onSubmit = (data: any) => {
    handleConfirm(data.accountType ? data.accountType : "Saving");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="accountType">
            <Form.Label>Account Type:</Form.Label>
            <Form.Control
              as="select"
              {...register("accountType", { required: true })}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              <option value="Saving">SAVINGS</option>
              <option value="Current">CURRENT</option>
              <option value="Joint">JOINT</option>
            </Form.Control>
            {errors.accountType && <span>Please select account type</span>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountCreateFormModal;
