import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../firebase/firebase";
const auth = getAuth(app);

const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    if (!/^(?=.*[A-Z]).*$/.test(password)) {
      setPasswordError("Please use at least one UpperCase letter");
      return;
    }
    if (!/^(?=.*[a-z]).*$/.test(password)) {
      setPasswordError("Please use at least one LowerCase letter");
      return;
    }
    if (!/^(?=.*[0-9]).*$/.test(password)) {
      setPasswordError("Please use at least one Number Digit");
      return;
    }
    if (!/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      setPasswordError("Please use at least one Special Character");
      return;
    }
    if (!/^.{6,16}$/.test(password)) {
      setPasswordError("Password must be 10-16 Characters Long.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        handleEmailVerification();
        userNameUpddate(name);
        setSuccess(true);
        setPasswordError("");
      })
      .catch((error) => {
        setPasswordError(error.message);
      });
    form.reset();
  };
  const handleEmailVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert(" Verificationn mail send please check your email and verify");
    });
  };
  const userNameUpddate = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Form className="w-50 mx-auto" onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" name="name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Register
        </Button>
      </Form>
      {success && (
        <p className="text-primary text-center">Registration Successfull</p>
      )}
      <p className="text-center text-danger">{passwordError}</p>
      <p className="text-center">
        If you already have an account. <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
