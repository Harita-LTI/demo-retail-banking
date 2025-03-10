// import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./loginFormStyles.css";
import { useLoginAndValidateMutation } from "../../../services/authServices";
import { setCredentials } from "../../../features/auth/authSlice";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { navigateUser } from "../../../utils/user";
import { setToken } from "../../../utils/token";
import { encrypt } from "../../../utils/utility";
import { useState } from "react";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginAndValidateMutation();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data: any) => {
    const { username, password } = data;
    setApiError(null);
    try {
      const user: any = await login({
        userName: username,
        password: password ? encrypt(password) : "",
        timeZone: "IST",
      }).unwrap();
      await dispatch(setCredentials(user));
      setToken(user?.token);
      navigateUser(user?.user, navigate);
    } catch (err: any) {
      //console.log("error", err);
      const msg = err?.data?.details
        ? err.data.details
        : "An error has occured";
      setApiError(msg);
      setFocus("password");
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
            {<p className="text-red m-0">{apiError}</p>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="username" className="py-2">
                <Form.Label>
                  Please enter your username
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  aria-label="Please enter your username"
                  autoComplete="off"
                  {...register("username", {
                    required: "You must provide your username.",
                  })}
                  isInvalid={!!errors.username}
                  className="login-input-field"
                />
                <Form.Control.Feedback type="invalid">
                  {typeof errors.username?.message === "string" &&
                    errors.username.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="py-2">
                <Form.Label>
                  Please enter your password{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  aria-label="Please enter your password"
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
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
