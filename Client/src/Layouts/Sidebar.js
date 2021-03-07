import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/Data";
const Sidebar = () => {
  const { toggleValue } = useContext(DataContext);
  const [toggle, setToggle] = toggleValue;
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;

  return (
    <Fragment>
      <div className={toggle ? "sidebar bg-dark" : "sidebar toggled bg-dark"}>
        <ul className="list-unstyled">
          {userData.adminCheck === true ? (
            <li>
              <Link to="/dashboard" onClick={() => setToggle(!toggle)}>
                {/* <Link to="/dashboard"> */}
                <i className="fa fa-fw fa-tachometer-alt mr-1"></i> Dashboard
              </Link>
            </li>
          ) : null}
          {userData.adminCheck === true ? (
            <li>
              <Link to="/menu" onClick={() => setToggle(!toggle)}>
                {/* <Link to="/menu"> */}
                <i className="fa fa-fw fa-list mr-1"></i> Menu
              </Link>
            </li>
          ) : null}
          <li>
            {userData.adminCheck === true ? (
              <Link
                to="/sell/select/a/table"
                onClick={() => setToggle(!toggle)}
              >
                {/* <Link to="/sell/select/a/table"> */}
                <i className="fa fa-fw fa-table mr-1"></i>{" "}
                {userData.adminCheck === true ? "Sell" : "Place Order"}
              </Link>
            ) : (
              <Link
                to="/current/Online Delivery"
                onClick={() => setToggle(!toggle)}
              >
                {/* <Link to="/sell/select/a/table"> */}
                <i className="fa fa-fw fa-table mr-1"></i>{" "}
                {userData.adminCheck === true ? "Sell" : "Place Order"}
              </Link>
            )}
          </li>
          <li>
            <Link to="/orders" onClick={() => setToggle(!toggle)}>
              {/* <Link to="/orders"> */}
              <i className="fas fa-bell mr-1"></i>{" "}
              {userData.adminCheck === true ? "Order Lists" : "Current Order"}
            </Link>
          </li>

          <li>
            <Link to="/reports" onClick={() => setToggle(!toggle)}>
              {/* <Link to="/reports"> */}
              <i className="fa fa-file mr-1"></i>{" "}
              {userData.adminCheck === true ? "Receipts" : "Order History"}
            </Link>
          </li>

          {userData.adminCheck === true ? (
            <li>
              <a href="#submenu1" data-toggle="collapse">
                <i className="fas fa-cog mr-1"></i> Settings
              </a>
              <ul id="submenu1" className="list-unstyled collapse">
                <li>
                  <Link to="/editDetails" onClick={() => setToggle(!toggle)}>
                    {/* <Link to="/editDetails"> */}
                    <i className="fas fa-info-circle mr-1"></i> Restaurant
                    Details
                  </Link>
                </li>
                <li>
                  <Link to="/editUsers" onClick={() => setToggle(!toggle)}>
                    {/* <Link to="/editUsers"> */}
                    <i className="fas fa-user mr-1"></i> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/instructions" onClick={() => setToggle(!toggle)}>
                    {/* <Link to="/instructions"> */}
                    <i className="fas fa-list-ul mr-1"></i> User Guide
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}
          {userData.adminCheck === false ? (
            <li>
              <a href="#submenu1" data-toggle="collapse">
                <i className="fas fa-cog mr-1"></i> Settings
              </a>
              <ul id="submenu1" className="list-unstyled collapse">
                <li>
                  <Link to="/editUsers" onClick={() => setToggle(!toggle)}>
                    {/* <Link to="/editProfile"> */}
                    <i className="far fa-id-card mr-1"></i> Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to="/instructions" onClick={() => setToggle(!toggle)}>
                    {/* <Link to="/instructions"> */}
                    <i className="fas fa-list-ul mr-1"></i> User Guide
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}
        </ul>
      </div>

      {/* <li>
            <a href="#submenu1" data-toggle="collapse">
              <i className="fa fa-fw fa-address-card"></i> Dropdown Link
            </a>
            <ul id="submenu1" className="list-unstyled collapse">
              <li>
                <a href="#">Submenu Item</a>
              </li>
              <li>
                <a href="#">Submenu Item</a>
              </li>
              <li>
                <a href="#">Submenu Item</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#submenu2" data-toggle="collapse">
              <i className="fa fa-fw fa-address-card"></i> Dropdown Link 2
            </a>
            <ul id="submenu2" className="list-unstyled collapse">
              <li>
                <a href="#">Submenu Item</a>
              </li>
              <li>
                <a href="#">Submenu Item</a>
              </li>
              <li>
                <a href="#">Submenu Item</a>
              </li>
            </ul>
          </li> */}
    </Fragment>
  );
};

export default Sidebar;
