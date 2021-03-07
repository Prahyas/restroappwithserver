import React, { Fragment, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import { DataContext } from "../Context/Data";
import { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import ErrorNotice from "./ErrorNotice";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [adminCheck, setAdminCheck] = useState(null);
  const [error, setError] = useState();
  const { userValue } = useContext(DataContext);
  const [userData, setUserData] = userValue;
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        adminCheck,
        address,
        contact,
      };
      await axios.post("/users/register", newUser);
      const loginRes = await axios.post("/users/login", {
        email,
        password,
      });
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
            <h3 className="mb-4 text-center">Register</h3>
            {error && (
              <ErrorNotice
                message={error}
                clearError={() => setError(undefined)}
              />
            )}
            <FormGroup tag="fieldset">
              <Row form>
                <Col md={6}>
                  <span>
                    <strong>Register as</strong>
                  </span>
                </Col>
                <Col md={6}>
                  {/* <FormGroup check className="form-check-inline">
                    <Label check>
                      <Input
                        disabled
                        type="radio"
                        name="adminCheck"
                        value={true}
                        onChange={(e) => setAdminCheck(e.target.value)}
                      />{" "}
                      Admin
                    </Label>
                  </FormGroup> */}
                  <FormGroup check className="form-check-inline">
                    <Label check>
                      <Input
                        defaultChecked
                        type="radio"
                        name="adminCheck"
                        value={false}
                        onChange={(e) => setAdminCheck(e.target.value)}
                      />{" "}
                      Customer
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Username</Label>
                  <Input
                    id="register-display-name"
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Re-type Password</Label>
                  <Input
                    type="password"
                    placeholder="Verify password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Address</Label>
                  <Input
                    id="register-address"
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Contact</Label>
                  <Input
                    id="register-contact"
                    type="number"
                    onChange={(e) => setContact(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <span className="d-block mb-2">
              Already a user? <Link to="/login">Login Here!!!</Link>{" "}
            </span>
            <Button
              className="defaultButtonColor"
              type="submit"
              value="Register"
              size="lg"
            >
              {" "}
              Register{" "}
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
