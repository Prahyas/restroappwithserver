import axios from "axios";
import { get } from "mongoose";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap";

import { DataContext } from "../../Context/Data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const EditCart = ({ match, table }) => {
  const { menuValue } = useContext(DataContext);
  const [menus, setMenus] = menuValue;
  const { reportValue } = useContext(DataContext);
  const [reports, setReports] = reportValue;
  const { fetchOrdersValue } = useContext(DataContext);
  const { fetchOrders } = fetchOrdersValue;
  const { fetchMenusValue } = useContext(DataContext);
  const { fetchMenus } = fetchMenusValue;
  const { fetchTablesValue } = useContext(DataContext);
  const { fetchTables } = fetchTablesValue;
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;
  const history = useHistory();
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { loggedinValue } = useContext(DataContext);
  const [loggedinUser, setLoggedinUser] = loggedinValue;
  const { getOrderValue } = useContext(DataContext);
  const [getOrder, setGetOrder] = getOrderValue;

  const check = cart.map((x) => {
    return x.quantity;
  });
  // console.log(check);
  // console.log(cart);

  const deleteFromCart = (_id) => {
    setCart(cart.filter((item) => item._id !== _id));
    toast.success("Removed from Cart", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  const notify = (status, method) => {
    if (status === 200 && method === "put") {
      toast.success("Order edited successfully.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } else {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  };

  const addToOrders = async () => {
    await axios
      .put(`/orders/update/${getOrder.orderId}`, {
        userId: getOrder.userId,
        oId: getOrder.oId,
        tId: getOrder.tId,
        tableName: getOrder.tableName,
        displayName: getOrder.displayName,
        customerAddress: getOrder.customerAddress,
        customerContact: getOrder.customerContact,
        date: getOrder.date,
        finalPrice: getOrder.finalPrice,
        totalQuantity: getOrder.totalQuantity,
        cart,
      })
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      )
      .catch((err) => console.error(err));
    await setCart([]);
    await setMenus([]);
    await fetchMenus();
    await fetchOrders();

    history.push("/orders");
  };

  const decrease = (_id) => {
    cart.forEach((item) => {
      if (item._id === _id) {
        item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
        item.totalPrice = item.price * item.quantity;
        setCart([...cart]);
      }
    });

    // alert('decreased');
  };
  const increase = (_id) => {
    cart.forEach((item) => {
      if (item._id === _id) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
        setCart([...cart]);
      }
    });
  };

  return (
    <Card className="mb-3 shadow bg-white rounded">
      <CardHeader>
        {" "}
        <div className="flexbetween">
          <h5 className="classheaderspan">Type : {getOrder.tableName}</h5>
          <h5> Ordered Items : {cart.length}</h5>
        </div>
      </CardHeader>
      {cart.length === 0 ? (
        <CardBody>No Items in Cart</CardBody>
      ) : (
        <CardBody>
          <Table className="fontsizefortables" size="sm" responsive hover>
            <thead className="thead">
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {cart.map((item) => (
                <tr className="tr" key={item._id}>
                  <td data-label="Item Name" className="td align-middle">
                    {item.itemName}
                  </td>
                  <td data-label="Quantity" className="td align-middle">
                    <Button
                      size="sm"
                      className="itemcarttablebutton mr-2 not-allowed align-middle"
                      onClick={() => decrease(item._id)}
                      disabled={item.quantity === 0}
                    >
                      <span>-</span>
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      className="itemcarttablebutton ml-2 align-middle"
                      onClick={() => increase(item._id)}
                    >
                      <span>+</span>
                    </Button>
                  </td>
                  <td data-label="Price" className="td align-middle">
                    {item.totalPrice ? item.totalPrice : 0}
                  </td>
                  <td data-label="Actions" className="td align-middle">
                    <Button
                      className="itemcarttablebutton align-middle"
                      size="sm"
                      color="danger"
                      onClick={() => deleteFromCart(item._id)}
                    >
                      {" "}
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            color="primary"
            size="sm"
            className="mt-2 not-allowed"
            disabled={check.includes(0)}
            onClick={() => {
              addToOrders();
            }}
          >
            Update Order
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default EditCart;
