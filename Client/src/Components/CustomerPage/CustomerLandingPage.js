import React from "react";
import { Fragment } from "react";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const CustomerLandingPage = () => {
  return (
    <Fragment>
      <div className="authBody">
        <div className="authLogo">
          <img src={logo} alt="logo" className="mt-5 mb-5" />
        </div>
        <div className="authLabel">
          <div>
            <h3 className="text-center text-white title1">Welcome to</h3>
            <h1 className="text-center text-white title2">Our Restaurant</h1>
          </div>
          <div>
            <Link to="/sell/1/Online Delivery">
              <Button className="mt-5" size="lg" color="secondary">
                Get A Meal!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerLandingPage;
