import React from "react";
import { Fragment } from "react";
import { ButtonGroup, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { DataContext } from "../Context/Data";
import { useContext } from "react";

const AuthOptions = () => {
  const { userValue } = useContext(DataContext);
  const [userData, setUserData] = userValue;
  const history = useHistory();

  // const register = () => history.push("/register");
  // const login = () => history.push("/login");
  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setUserData({
        token: undefined,
        user: undefined,
        id: undefined,
        displayName: undefined,
        email: undefined,
      });
      localStorage.setItem("auth-token", "");
      history.push("/");
      history.go(0);
    }
  };

  return (
    <Fragment>
      {userData.user ? (
        <Button
          className=" mr-2 ml-2"
          onClick={logout}
          size="sm"
          color="danger"
        >
          Log Out
        </Button>
      ) : (
        <ButtonGroup>
          <Link
            to="/register"
            className="text-decoration-none text-white align-middle mr-3 "
            size="sm"
            color="secondary"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="text-decoration-none text-white align-middle"
            size="sm"
            color="secondary"
          >
            Login
          </Link>
        </ButtonGroup>
      )}
    </Fragment>
  );
};

export default AuthOptions;
