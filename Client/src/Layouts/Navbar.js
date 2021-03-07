import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import AuthOptions from "../Auth/AuthOptions";
import { DataContext } from "../Context/Data";

const Navbar = () => {
  const { toggleValue } = useContext(DataContext);
  const [toggle, setToggle] = toggleValue;
  const { detailValue } = useContext(DataContext);
  const [details] = detailValue;
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;

  const restaurantName = details.map((x) => {
    return x.restaurantName;
  });
  // const userName = settings.map((x) => {
  //   return x.userName;
  // });

  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {userData.user ? (
          <Fragment>
            <div className="sidebar-toggle text-light align-middle mr-3">
              <i
                onClick={() => setToggle(!toggle)}
                className="fa fa-bars hamburger align-middle"
              ></i>
            </div>
            {/* <Link to="/sell/:tId/:tableName" className="navbar-brand appname"> */}
            {userData.adminCheck === true ? (
              <Link
                to="/dashboard"
                className="navbar-brand appname flexbetween"
              >
                <i className="fas fa-utensils mr-2 align-middle"></i>{" "}
                <span className="align-middle">
                  {details.length === 0 ? "Restro App" : `${restaurantName}`}
                </span>
              </Link>
            ) : (
              <Link to="/customer" className="navbar-brand appname flexbetween">
                <i className="fas fa-utensils mr-2 align-middle"></i>{" "}
                <span className="align-middle">
                  {details.length === 0 ? "Restro App" : `${restaurantName}`}
                </span>
              </Link>
            )}
          </Fragment>
        ) : (
          // <div className="navbar-brand appname flexbetween">
          //   <i className="fas fa-utensils mr-2"></i> <span>Restro App</span>
          // </div>
          <Link to="/" className="navbar-brand appname flexbetween">
            <i className="fas fa-utensils mr-2 align-middle"></i>{" "}
            <span className="align-middle">
              {details.length === 0 ? "Restro App" : `${restaurantName}`}
            </span>
          </Link>
        )}

        <div className="navbar-collapse collapse ">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div
                className="nav-link flexbetween "
                id="navbarDropdownMenuLink"
              >
                {userData.user ? (
                  <div className="hideUserName mr-2">
                    <Link
                      to="/editUsers"
                      className="text-decoration-none text-white"
                    >
                      <i className="fa fa-user align-middle"></i>
                      <span className="mr-2 ml-2 align-middle">
                        {userData.user.displayName
                          ? `${userData.user.displayName}`
                          : ""}
                      </span>
                    </Link>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <AuthOptions />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* {userData.user ? (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Button
              size="sm"
              className="sidebar-toggle text-light mr-3"
              onClick={() => setToggle(!toggle)}
            >
              <i className="fa fa-bars"></i>
            </Button>

            <Link to="/sell/:tId/:tableName" className="navbar-brand appname">
              <i className="fas fa-hamburger"></i>{" "}
              <span>
                {settings.length === 0 ? "Restro App" : `${restaurantName}`}
              </span>
            </Link>

            <div className="navbar-collapse collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="nav-link" id="navbarDropdownMenuLink">
                    {userData.user ? (
                      <div>
                        <i className="fa fa-user"></i>
                        <span className="mr-2 ml-2">
                          {userData.user.displayName
                            ? `${userData.user.displayName}`
                            : ""}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <AuthOptions />
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      ) : null} */}
    </Fragment>
  );
};

export default Navbar;
