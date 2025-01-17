import React, { AnyActionArg } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaListAlt, FaPlus } from "react-icons/fa";
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
        <Row className="text-red border-bottom border-2 bg-light p-2 mb-2">
          <Col>
            <b>Personal Information</b>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              {...register("firstName", { required: true, maxLength: 20 })}
            />
            {errors.firstName && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              {...register("lastName", { required: true, maxLength: 20 })}
            />
            {errors.lastName && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" as={Col} xs md={6}>
            <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <Form.Text className="text-danger">
                This field is required
              </Form.Text>
            )}
          </Form.Group>
        </Row>
        <Row className="text-red border-bottom border-2 bg-light p-2 mt-3 mb-2">
          <Col>
            <b>Contact Information</b>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Residential Address <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
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
            <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
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
            <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="tel"
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
        <Row className="text-red border-bottom border-2 bg-light p-2 mt-3 mb-2">
          <Col>
            <b>Identification Information</b>
          </Col>
        </Row>
        <Row>
        <Form.Group className="mb-3" as={Col}>
          <Form.Label>PAN Number <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
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
          <Form.Label>AADHAR Number <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
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
          <Button type="button" className="ms-2" variant="dark" onClick={() => reset()}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

function CreateCustomerPage() {
  //return 'abcd'
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
