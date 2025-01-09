import React, { AnyActionArg } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(JSON.stringify(data));

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Personal Information</h2>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
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
            <Form.Label>Last Name</Form.Label>
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
        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
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

        <h2>Contact Information</h2>
        <Form.Group className="mb-3">
          <Form.Label>Residential Address</Form.Label>
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
        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
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
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
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

        <h2>Identification Information</h2>
        <Form.Group className="mb-3">
          <Form.Label>PAN Number</Form.Label>
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

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateCustomer;
