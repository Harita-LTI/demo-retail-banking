// import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./loginFormStyles.css";
import { useLoginAndValidateMutation } from "../../../services/authServices";
import { setCredentials } from "../../../features/auth/authSlice";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginAndValidateMutation();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      const user: any = await login({
        emailId: email,
        password: password,
        timeZone: "IST",
      }).unwrap();
      await dispatch(setCredentials(user));
      if (user?.user?.role && user.user.role === "BF_ADMIN") {
        navigate("/admin/customers");
      } else if (user?.user?.role && user.user.role !== "BF_ADMIN") {
        navigate("/user/dashboard");
      } else {
        console.log("role not found");
      }
    } catch (err) {
      console.log("error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f4f4f4" }}
    >
      <Container
        className="login-container p-4 shadow"
        style={{ backgroundColor: "#fff", maxWidth: "498px" }}
      >
        <Row className="justify-content-md-center">
          <Col md="12">
            <h1 className="headline pb-4">Log In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email" className="py-2">
                <Form.Label>Please enter your email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  {...register("email", {
                    required: "You must provide your email.",
                  })}
                  isInvalid={!!errors.email}
                  className="login-input-field"
                />
                <Form.Control.Feedback type="invalid">
                  {typeof errors.email?.message === "string" &&
                    errors.email.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="py-2">
                <Form.Label>Please enter your password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", {
                    required: "You must provide your password.",
                  })}
                  isInvalid={!!errors.password}
                  className="login-input-field"
                />
                <Form.Control.Feedback type="invalid">
                  {typeof errors.password?.message === "string" &&
                    errors.password.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="LoginBtn mt-3">
                Log In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
