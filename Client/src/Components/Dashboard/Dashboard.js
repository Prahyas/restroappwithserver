import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "reactstrap";
import { DataContext } from "../../Context/Data";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

const Dashboard = () => {
  const { reportValue } = useContext(DataContext);
  const [reports] = reportValue;
  const { orderValue } = useContext(DataContext);
  const [orders] = orderValue;
  const { menuValue } = useContext(DataContext);
  const [menus] = menuValue;

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // }, []);

  return (
    <Fragment>
      <h3 className="mb-1">Dashboard</h3>
      <hr />
      <div className="flexevenly">
        <div className="cardsinsidedashboard">
          <Link to="/reports" className="text-decoration-none">
            <Card body inverse color="primary" className="mb-3">
              <CardTitle>
                {" "}
                <h3 className="text-center"> {reports.length}</h3>
              </CardTitle>
              <h5 className="text-center">Total Sales</h5>
            </Card>
          </Link>
        </div>
        <div className="cardsinsidedashboard">
          <Link to="/orders" className="text-decoration-none">
            <Card body inverse color="info" className="mb-3">
              <CardTitle>
                {" "}
                <h3 className="text-center"> {orders.length}</h3>
              </CardTitle>
              <h5 className="text-center">Active Orders</h5>
            </Card>
          </Link>
        </div>
        <div className="cardsinsidedashboard">
          <Link to="/menu" className="text-decoration-none">
            <Card body inverse color="danger" className="mb-3">
              <CardTitle>
                {" "}
                <h3 className="text-center"> {menus.length}</h3>
              </CardTitle>

              <h5 className="text-center">Menu Items</h5>
            </Card>
          </Link>
        </div>
      </div>
      <div className="mt-3 flexevenly">
        <Chart1 />
        <Chart2 />
      </div>
    </Fragment>
  );
};

export default Dashboard;
