import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaPlus } from "react-icons/fa";
import PrimaryLinkButton from "../../components/common/PrimaryLinkButton";

const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <Container className="mt-3">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="text-primary border-bottom border-2 bg-light p-2 mb-2">
          <Col>
            <h4>Personal Information</h4>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>
              First Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              aria-label="First Name"
              {...register("firstName", { required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.firstName && (
              <Form.Text className="text-danger">
                This field is required and should be at least 3 characters long
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>
              Last Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              aria-label="Last Name"
              {...register("lastName", { required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.lastName && (
              <Form.Text className="text-danger">
                This field is required and should be at least 3 characters long
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col} xs md={6}>
            <Form.Label>
              Date of Birth <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              aria-label="Date of Birth"
              {...register("dateOfBirth", { required: true })}
            />
            {/* <Form.Control
              type="text"
              aria-label="Date of Birth"
              placeholder="dd-mm-yyyy"
              {...register("dateOfBirth", {
                required: true,
                pattern: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
              })}
            /> */}
            {errors.dateOfBirth && (
              <Form.Text className="text-danger">
                This field is required and should be in the format dd-mm-yyyy
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="text-primary border-bottom border-2 bg-light p-2 mt-3 mb-2">
          <Col>
            <h4>Contact Information</h4>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>
            Residential Address <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            aria-label="Residential Address"
            {...register("residentialAddress", { required: true })}
          />
          {errors.residentialAddress && (
            <Form.Text className="text-danger">
              This field is required
            </Form.Text>
          )}
        </Form.Group>
        <Row>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>
              Email Address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              aria-label="Email"
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                This field is required and must be a valid email address
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>
              Phone Number <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              aria-label="Phone Number"
              {...register("phoneNumber", {
                required: true,
                pattern: /^[0-9]{10}$/,
              })}
            />
            {errors.phoneNumber && (
              <Form.Text className="text-danger">
                This field is required and must be a 10-digit number
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="text-primary border-bottom border-2 bg-light p-2 mt-3 mb-2">
          <Col>
            <h4>Identification Information</h4>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>PAN Number <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              aria-label="PAN Number"
              {...register("panNumber", {
                required: true,
                pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              })}
            />
            {errors.panNumber && (
              <Form.Text className="text-danger">
                This field is required and must be a valid PAN number
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>AADHAAR Number <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              aria-label="AADHAR Number"
              {...register("aadharNumber", {
                required: true,
                pattern: /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
              })}
            />
            {errors.aadharNumber && (
              <Form.Text className="text-danger">
                This field is required and must be a valid Aadhar number
              </Form.Text>
            )}
          </Form.Group>
        </Row>
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
    </Container>
  );
};

function CreateCustomerPage() {
  return (
    <LayoutWithSidebar
      icon={<FaPlus />}
      title={"Add New Customer"}
      btn={
        <PrimaryLinkButton buttonText="Customer List" url="/admin/customers" />
      }
    >
      <CreateCustomer />
    </LayoutWithSidebar>
  );
}

export default CreateCustomerPage;
