import React, { Fragment, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import { DataContext } from "../Context/Data";
import { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { userValue } = useContext(DataContext);
  const [userData, setUserData] = userValue;
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post("/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        adminCheck: loginRes.data.user.adminCheck,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      if (loginRes.data.user.adminCheck === true) {
        history.push("/dashboard");
        history.go(0);
      } else {
        history.push("/current/Online Delivery");
        history.go(0);
      }
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  useEffect(() => {
    if (userData.user && userData.adminCheck === true) {
      history.push("/dashboard");
    }
  }, [userData]);

  useEffect(() => {
    console.log({ userData });
  }, [userData]);

  return (
    <Fragment>
      <div className="authBody">
        {/* <h3 className="mb-5 text-center text-white title">
          Restaurant Management System
        </h3> */}
        <div className="authContainer">
          <Form className="authForm" onSubmit={submit}>
            <h3 className="mb-4 text-center">Login</h3>
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                id="login-email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="login-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <span className="d-block mb-2">
              New here? <Link to="/register">Register Now!!!</Link>{" "}
            </span>
            <Button
              size="lg"
              className="defaultButtonColor"
              type="submit"
              value="Log in"
            >
              {" "}
              Login{" "}
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
