import React, { Fragment } from "react";
import { useEffect } from "react";
import { DataContext } from "../Context/Data";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import Food2 from "../Images/Food2.png";

const LandingPage = () => {
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { detailValue } = useContext(DataContext);
  const [details] = userValue;
  const history = useHistory();

  useEffect(() => {
    if (userData.user && userData.adminCheck === true)
      history.push("/dashboard");
  }, [userData]);

  useEffect(() => {
    console.log({ details });
  }, [details]);
  return (
    <Fragment>
      <div className="authBody">
        <div className="authlabelandimg">
          <div className="authlabel">
            <h1 className="text-left text-dark title1">
              <strong>Welcome</strong>
            </h1>
            <h4 className="text-left text-dark title2"> to our Restaurant</h4>
            <Link to="/login">
              <Button
                size="lg"
                className="mt-3 text-left text-white title3 defaultButtonColor"
              >
                Get a Meal!
              </Button>
            </Link>
          </div>
          <div>
            <img src={Food2} alt="Food" className="authimg" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
