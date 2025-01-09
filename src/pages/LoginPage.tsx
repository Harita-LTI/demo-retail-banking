import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

import GenericLayout from "../components/common/Layout";

// function SignInForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const navigate = useNavigate();
//   let timerInterval;

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const decode = token ? atob(token) : undefined;
//     if (decode) {
//       navigate("/dashboard");
//     }
//   })

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setEmailError("You must provide your email.");
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("You must provide your password.");
//     } else {
//       setPasswordError("");
//     }

//     if (email && password) {
//       try {
//         const response = await axios.post(
//           "http://localhost:8080/api/simple/banking/login",
//           { email, password }
//         );
//         if (response.data.statusCode === 200 && response.data.accountNumber) {
//           let encode = btoa(response.data.accountNumber);
//           localStorage.setItem(
//             "token",
//             // JSON.stringify(response.data.accountNumber)
//             encode
//           );
//           Swal.fire({
//             title: "Login Successful",
//             timer: 2000,
//             timerProgressBar: true,
//             willClose: () => {
//               clearInterval(timerInterval);
//             },
//           }).then((result) => {
//             if (
//               result.dismiss === Swal.DismissReason.timer ||
//               result.isConfirmed
//             ) {
//               navigate("/dashboard");
//             }
//           });
//         }
//       } catch (err) {
//         Swal.fire({
//           title: "Invalid Credentials: Please check your email and password",
//           timer: 2000,
//           timerProgressBar: true,
//           willClose: () => {
//             clearInterval(timerInterval);
//           },
//         });
//       }
//     }
//   };
//   const handleBlur = (field) => {
//     if (field === "email" && !email) {
//       setEmailError("You must provide your email.");
//     } else if (field === "password" && !password) {
//       setPasswordError("You must provide your password.");
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <div>
//       <div className="login-container custom-paddings">
//         <div className="login-header-container">
//           <h1 className="headline">Log In</h1>
//         </div>
//         <form
//           onSubmit={handleOnSubmit}
//           style={{
//             display: "flex",
//             justifyContent: "unset",
//             alignItems: "unset",
//           }}
//         >
//           <div className="form-group login-form-group1">
//             <div className="login-label-container">
//               <label htmlFor="email" className="login-label">
//                 Please enter your email
//               </label>
//             </div>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               className="LoginInput"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (e.target.value) setEmailError("");
//               }}
//               onBlur={() => handleBlur("email")}
//               required
//             />
//             {emailError && (
//               <p className="error">
//                 <span className="error-icon">&#10060;</span>
//                 {emailError}
//               </p>
//             )}
//           </div>
//           <div className="form-group login-form-group2">
//             <div className="login-label-container">
//               <label htmlFor="password" className="login-label">
//                 Please enter your password
//               </label>
//             </div>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="LoginInput"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 if (e.target.value) setPasswordError("");
//               }}
//               onBlur={() => handleBlur("password")}
//               required
//             />
//             {passwordError && (
//               <p className="error">
//                 <span className="error-icon">&#10060;</span>
//                 {passwordError}
//               </p>
//             )}
//           </div>
//           <br />
//           <div className="login-button-container">
//             <button className="LoginBtn">Log In</button>
//           </div>
//         </form>
//       </div>
//       <div className="not-registered" onClick={handleRegisterClick}>
//         Not registered for Personal Internet Banking?
//         <span className="register-icon"> &gt;</span>
//       </div>
//     </div>
//   );
// }

function SignInForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  let timerInterval;

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const decode = token ? atob(token) : undefined;
  //   if (decode) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const onSubmit = async (data:any) => {
    const { email, password } = data;

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
    <Container className="login-container custom-paddings">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="headline">Log In</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Please enter your email</Form.Label>
              <Form.Control
                type="email"
                {...register('email', { required: "You must provide your email." })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
              {typeof errors.email?.message === 'string' && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Please enter your password</Form.Label>
              <Form.Control
                type="password"
                {...register('password', { required: "You must provide your password." })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
              {typeof errors.email?.message === 'string' && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="LoginBtn">
              Log In
            </Button>
          </Form>
          {/* <div className="not-registered" onClick={handleRegisterClick}>
            Not registered for Personal Internet Banking?
            <span className="register-icon"> &gt;</span>
          </div> */}
        </Col>
      </Row>
    </Container>
  );
}

function LoginPage() {
  //return 'abcd'
  return <GenericLayout> <SignInForm/></GenericLayout>
}

export default LoginPage;