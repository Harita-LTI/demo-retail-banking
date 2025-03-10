import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const AccountCreateFormModal = ({ show, handleClose, handleConfirm }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm();

  const [selectedType, setSelectedType] = useState("");
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  useEffect(() => {
    // Set the first option as selected when the component mounts
    setSelectedType("Saving");
  }, []);

  const onSubmit = (data: any) => {
    handleConfirm(data.accountType ? data.accountType : "Saving");
    handleClose();
  };

  const handleAccountTypeChange = (e: any) => {
    const val = e.target.value;
    setSelectedType(val);
    setShowCustomerDropdown(val === "Joint");
    if (val !== "Joint") {
      setValue("co_owner", "");
      clearErrors("co_owner");
    }
  };

  const handleCloseClick = () => {
    handleClose();
    reset();
    setSelectedType("Saving");
    setShowCustomerDropdown(false);
  };

  return (
    <Modal show={show} onHide={handleCloseClick}>
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
              onChange={(e) => {
                setSelectedType(e.target.value);
                handleAccountTypeChange(e);
              }}
              className="form-select"
            >
              <option value="Saving">SAVINGS</option>
              <option value="Current">CURRENT</option>
              <option value="Joint">JOINT</option>
            </Form.Control>
            {errors.accountType && (
              <span className="text-danger">Please select account type</span>
            )}
          </Form.Group>
          {showCustomerDropdown && (
            <Form.Group controlId="co_owner" className="mt-3">
              <Form.Label>Select Co-Owner:</Form.Label>
              <Form.Control
                as="select"
                {...register("co_owner", { required: showCustomerDropdown })}
                //value={""}
                defaultValue=""
                className="form-select"
              >
                <option value="Customer1">Gautam Raj</option>
                <option value="Customer2">Shweta Singh</option>
                <option value="Customer3">Amar Gupta</option>
              </Form.Control>
              {errors.co_owner && (
                <span className="text-danger">Please select a co-owner</span>
              )}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button variant="danger" onClick={handleCloseClick}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountCreateFormModal;
