import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";

const EditCustomerModal = ({ user, show, handleClose, handleConfirm }: any) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();
  const formRef: any = useRef(null);

  useEffect(() => {
    if (user && show) {
      clearErrors();
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("emailId", user.emailId);
      setValue("contact", user.contact);
      setValue("address", user.address);
      setValue("gender", user.gender);
    }
  }, [user, setValue, show]);

  const onSubmit = (data: any) => handleConfirm(data);

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-4">
                <Form.Label>
                  First Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-danger">This field is required</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-4">
                <Form.Label>
                  Last Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-danger">This field is required</span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail" className="mb-4">
                <Form.Label>
                  Email <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  {...register("emailId", {
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  })}
                />
                {errors.emailId && (
                  <span className="text-danger">
                    This field is required and must be a valid email address
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formContact" className="mb-4">
                <Form.Label>
                  Contact Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  {...register("contact", {
                    required: true,
                    pattern: /^[0-9]{10}$/,
                  })}
                />
                {errors.contact && (
                  <span className="text-danger">
                    This field is required and must be a 10-digit number
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formAddress" className="mb-4">
                <Form.Label>
                  Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-danger">This field is required</span>
                )}
              </Form.Group>
            </Col>
            <Form.Group controlId="gender" as={Col} xs md={6}>
              <Form.Label>
                Gender <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                {...register("gender", { required: true })}
                //onChange={(e) => setSelectedReason(e.target.value)}
                className="form-select"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Control>
              {errors.gender && (
                <Form.Text className="text-danger">
                  This field is required
                </Form.Text>
              )}
            </Form.Group>
            <Col md={6}>
              <Form.Group controlId="formDOB" className="mb-4">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="text" value={user.dateOfBirth} disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formPAN" className="mb-4">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control type="text" value={user.panNumber} disabled />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAadhar" className="mb-4">
                <Form.Label>Aaadhar Number</Form.Label>
                <Form.Control type="text" value={user.aadharNumber} disabled />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleExternalSubmit}>
          Update
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCustomerModal;
