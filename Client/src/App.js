import React, { Fragment } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Navbar from "./Layouts/Navbar";
import Sidebar from "./Layouts/Sidebar";
import Sell from "./Components/Sell/Sell";
import Menu from "./Components/Menus/Menu";
import { DataProvider } from "./Context/Data";
import { HashRouter, Switch, Route } from "react-router-dom";
import Orders from "./Components/Orders/Orders";
import Reports from "./Components/Reports/Reports";
import ReportDetails from "./Components/Reports/ReportDetails";
import OrderDetails from "./Components/Orders/OrderDetails";
import Details from "./Components/Settings/Details/Details";
import Users from "./Components/Settings/Users/Users";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import LandingPage from "./Auth/LandingPage";
import CustomerLandingPage from "./Components/CustomerPage/CustomerLandingPage";
import Instructions from "./Components/Settings/Instructions/Instructions";
import EditOrder from "./Components/Sell/EditOrder";
import CurrentTab from "./Components/Sell/CurrentTab";
import ItemCart from "./Components/Sell/ItemCart";

const App = () => {
  return (
    <Fragment>
      <div id="top"></div>
      <DataProvider>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/customer" component={CustomerLandingPage} />
            <div className="d-flex align-items-stretch">
              <Sidebar />
              <div className="content p-2">
                <div className="p-3 border shadow rounded bodybackground">
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route path="/sell/:tId/:tableName" component={Sell} />
                  <Route path="/menu" component={Menu} />
                  <Route path="/editOrder" component={EditOrder} />
                  <Route path="/cart" component={ItemCart} />
                  <Route path="/current/:tableName" component={CurrentTab} />
                  <Route exact path="/orders" component={Orders} />
                  <Route path="/orders/:oId" component={OrderDetails} />
                  <Route exact path="/reports" component={Reports} />
                  <Route path="/reports/:oId" component={ReportDetails} />
                  <Route path="/editDetails" component={Details} />
                  <Route path="/editUsers" component={Users} />
                  <Route path="/instructions" component={Instructions} />
                </div>
              </div>
            </div>
          </Switch>
          <div className="scrollbuttons">
            <a href="#top">
              <i className=" tothetop fa fa-arrow-circle-up"></i>
            </a>
          </div>
        </HashRouter>
      </DataProvider>

      {/* <Route path="/greeting/:name" render={(props) => <Greeting text="Hello, " {...props} />} /> */}
    </Fragment>
  );
};

export default App;
