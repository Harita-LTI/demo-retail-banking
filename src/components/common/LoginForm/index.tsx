// import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "./loginFormStyles.css";

export default function SignInForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  // let timerInterval;

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const decode = token ? atob(token) : undefined;
  //   if (decode) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const onSubmit = async (data:any) => {
    const { email, password } = data;

    if(email && email === "admin@gmail.com" && password && password === "admin") {
      navigate("/admin")
    }
    else {
      navigate("/dashboard")
    }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/simple/banking/login",
    //     { email, password }
    //   );
    //   if (response.data.statusCode === 200 && response.data.accountNumber) {
    //     let encode = btoa(response.data.accountNumber);
    //     localStorage.setItem("token", encode);
    //     Swal.fire({
    //       title: "Login Successful",
    //       timer: 2000,
    //       timerProgressBar: true,
    //       willClose: () => {
    //         clearInterval(timerInterval);
    //       },
    //     }).then((result) => {
    //       if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed) {
    //         navigate("/dashboard");
    //       }
    //     });
    //   }
    // } catch (err) {
    //   Swal.fire({
    //     title: "Invalid Credentials: Please check your email and password",
    //     timer: 2000,
    //     timerProgressBar: true,
    //     willClose: () => {
    //       clearInterval(timerInterval);
    //     },
    //   });
    // }
  };

  // const handleRegisterClick = () => {
  //   navigate("/register");
  // };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f4f4f4' }}>
      <Container className="login-container p-4 shadow" style={{ backgroundColor: '#fff', maxWidth: '498px' }}>
        <Row className="justify-content-md-center">
          <Col md="12">
            <h1 className="headline pb-4">Log In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="email" className="py-2">
                <Form.Label>Please enter your email</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete='off'
                  {...register('email', { required: "You must provide your email." })}
                  isInvalid={!!errors.email}
                  className='login-input-field'
                />
                <Form.Control.Feedback type="invalid">
                  {typeof errors.email?.message === 'string' && errors.email.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password" className="py-2">
                <Form.Label>Please enter your password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', { required: "You must provide your password." })}
                  isInvalid={!!errors.password}
                  className='login-input-field'
                />
                <Form.Control.Feedback type="invalid">
                  {typeof errors.password?.message === 'string' && errors.password.message}
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