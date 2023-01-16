import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../firebase/firebase";

const auth = getAuth(app);
const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };
  const handleEmailBlur = (event) => {
    const email = event.target.value;
    console.log(email);
    setEmailAddress(email);
  };
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, emailAddress)
      .then((result) => {
        alert("Password reset mail sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form className="w-50 mx-auto" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            type="email"
            placeholder="Enter email"
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="secondary" onClick={handlePasswordReset}>
          Forget Password
        </Button>
      </Form>

      <p className="text-center">
        If you are new user create an account.{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
