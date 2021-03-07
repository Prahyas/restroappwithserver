import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import { DataContext } from "../../Context/Data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Orders = () => {
  const { orderValue } = useContext(DataContext);
  const [orders, setOrders] = orderValue;
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;

  const copyOrders = [...orders];
  const reversedOrders = copyOrders.reverse();
  const { filteredOrdersValue } = useContext(DataContext);
  const [filteredOrders, setFilteredOrders] = filteredOrdersValue;
  const { fetchOrdersValue } = useContext(DataContext);
  const { fetchOrders } = fetchOrdersValue;
  const { loggedinValue } = useContext(DataContext);
  const [loggedinUser, setLoggedinUser] = loggedinValue;
  const { tableValue } = useContext(DataContext);
  const [table, setTable] = tableValue;
  const { initialvaluefortable } = useContext(DataContext);

  const { getOrderValue } = useContext(DataContext);
  const [getOrder, setGetOrder] = getOrderValue;
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const history = useHistory();

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  useEffect(() => {
    fetchOrders();
  }, []);

  const getFilteredOrders = () => {
    if (loggedinUser) {
      const data = orders.filter((item) => item.userId === loggedinUser.id);
      setFilteredOrders(data);
    }
  };
  useEffect(() => {
    getFilteredOrders();
  }, [orders]);

  const addToReport = async () => {
    await axios
      .post("/reports/addreport", getOrder)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      );
    fetchOrders();
    // console.log({ id });
    // const data = orders.find((order) => {
    //   return order._id === id;
    // });
    // console.log({ data });
    // .then((res) => console.log(res))
    // .catch((err) => console.error(err));

    // setReports([...reports, ...data]);
  };

  const editOrders = async (order) => {
    await getSingleOrder(order);
    await setCart(order.cart);
    history.push("/editOrder");
  };

  const deleteOrders = async (id, tId) => {
    await axios
      .delete(`/orders/delete/${id}`)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      );
    if (userData.adminCheck === true) {
      await reservedCase(tId);
    }
    fetchOrders();
    if (userData.adminCheck === false) {
      setInterval(() => {
        history.go(0);
      }, 1500);
    }

    // setOrders(orders.filter((order) => order.oId !== getOrder.oId));
  };
  const deleteOrdersForReport = (id) => {
    axios.delete(`/orders/delete/${id}`);

    // history.go(0);
  };

  // const deleteAll = () => {
  //   axios.delete("/orders/delete");
  //   setOrders([]);
  // };

  const reservedCase = (tId) => {
    console.log({ tId });

    const updatedReservedCase = {
      reserved: "false",
    };
    axios.patch(`/tables/update/${tId}`, updatedReservedCase);

    // setTables(
    //   tables.map((item) => {
    //     if (item.tId === table.tId) {
    //       return {
    //         ...item,
    //         reserved: !item.reserved,
    //       };
    //     }
    //     return item;
    //   })
    // );
  };

  // const getTable = (order) => {
  //   setTable({
  //     tId: order.tId,
  //     tableName: order.tableName,
  //     reserved: order.reserved,
  //   });
  // };

  const getSingleOrder = (order) => {
    setGetOrder({
      userId: order.userId,
      oId: order.oId,
      tId: order.tId,
      orderId: order._id,
      tableName: order.tableName,
      displayName: order.displayName,
      customerAddress: order.customerAddress,
      customerContact: order.customerContact,
      date: order.date,
      finalPrice: order.finalPrice,
      totalQuantity: order.totalQuantity,
      cart: order.cart,
    });
  };

  const notify = (status, method) => {
    if (status === 200 && method === "post") {
      toast.success("Order Confirmed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
    if (status === 200 && method === "delete") {
      toast.success("Order Cancelled", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  };

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // }, []);

  return (
    <Fragment>
      <div className="flexbetween">
        <h3 className="mb-1">Orders</h3>
        {/* <Button size="sm" color="danger" onClick={() => deleteAll()}>
          Delete all
        </Button> */}
      </div>
      <hr />
      <div className="mb-3">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fas fa-search"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </InputGroup>
        <span className="ml-5 d-block align-middle">
          <small> *(Date format: mm/dd/yyyy)</small>
        </span>
      </div>
      {userData.adminCheck === true ? (
        <Container>
          {reversedOrders.length > 0 ? (
            <div className="flexevenly mt-4">
              {reversedOrders
                .filter((order) => {
                  if (searchTerm === "") {
                    return order;
                  }
                  if (
                    order.tableName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return order;
                  }
                  if (
                    order.date.toString().toLowerCase().includes(searchTerm)
                  ) {
                    return order;
                  }
                })
                .map((order) => (
                  <Card
                    key={reversedOrders._id}
                    className="ordercard mb-3 shadow bg-white rounded"
                  >
                    <CardHeader className=" fontsizefortables">
                      <div className="font-weight-bold flexbetween">
                        <big>Type :</big>
                        <big>{order.tableName}</big>
                      </div>
                      <br />
                      <div className="flexbetween">
                        <span>Date :</span>
                        <span>{order.date}</span>
                      </div>
                      <div className="flexbetween">
                        <span>Id :</span>
                        <span>{order.oId}</span>
                      </div>
                      <div className="flexbetween">
                        <span>Ordered By :</span>
                        <span>{order.displayName}</span>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table
                        className="fontsizefortables"
                        size="sm"
                        responsive
                        hover
                      >
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            {/* <th>Price</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {order.cart.map((order) => (
                            <tr key={order._id}>
                              <td>{order.itemName}</td>
                              <td>{order.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter>
                      {/* <Link to="/sell/:tId/:tableName">
										<Button size="sm">Edit Order</Button>
									</Link> */}
                      <ButtonGroup>
                        {userData.adminCheck === true ? (
                          <Button
                            size="sm"
                            className="mr-2"
                            color="primary"
                            onClick={() => {
                              // getTable(order);
                              getSingleOrder(order);
                              toggle();
                            }}
                          >
                            Checkout
                          </Button>
                        ) : null}

                        <Button
                          size="sm"
                          color="warning"
                          className="mr-2"
                          onClick={() => {
                            editOrders(order);
                          }}
                        >
                          Edit Order
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => {
                            getSingleOrder(order);
                            toggle2();
                          }}
                        >
                          Cancel Order
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} charCode="x">
                        Confirmation
                      </ModalHeader>
                      <ModalBody>
                        <Container>Are you sure?</Container>
                      </ModalBody>
                      <ModalFooter>
                        <Link to={`/orders/${getOrder.oId}`}>
                          <Button
                            size="sm"
                            color="primary"
                            onClick={() => {
                              reservedCase(getOrder.tId);
                              addToReport();
                              toggle();
                              setTable(initialvaluefortable);
                              deleteOrdersForReport(getOrder.orderId);
                            }}
                          >
                            Yes
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => toggle()}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2}>
                      <ModalHeader toggle={toggle2} charCode="x">
                        Confirmation
                      </ModalHeader>
                      <ModalBody>
                        <Container>Are you sure?</Container>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          size="sm"
                          color="primary"
                          onClick={() => {
                            deleteOrders(getOrder.orderId, getOrder.tId);
                            toggle2();
                          }}
                        >
                          Yes
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => toggle2()}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Card>
                ))}
            </div>
          ) : (
            <Fragment>No orders yet</Fragment>
          )}
        </Container>
      ) : (
        <Container>
          {filteredOrders.length > 0 ? (
            <div className="flexevenly mt-4">
              {filteredOrders
                .filter((order) => {
                  if (searchTerm === "") {
                    return order;
                  }
                  if (
                    order.date
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return order;
                  }
                })
                .map((order) => (
                  <Card
                    key={reversedOrders._id}
                    className="ordercard mb-3 shadow bg-white rounded"
                  >
                    <CardHeader className=" fontsizefortables">
                      <div className="font-weight-bold flexbetween">
                        <big>Type :</big>
                        <big>{order.tableName}</big>
                      </div>
                      <br />
                      <div className="flexbetween">
                        <span>Date :</span>
                        <span>{order.date}</span>
                      </div>
                      <div className="flexbetween">
                        <span>Id :</span>
                        <span>{order.oId}</span>
                      </div>
                      <div className="flexbetween">
                        <span>Ordered By :</span>
                        <span>{order.displayName}</span>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table
                        className="fontsizefortables"
                        size="sm"
                        responsive
                        hover
                      >
                        <thead>
                          <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            {/* <th>Price</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {order.cart.map((order) => (
                            <tr key={order._id}>
                              <td>{order.itemName}</td>
                              <td>{order.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter>
                      {/* <Link to="/sell/:tId/:tableName">
                  <Button size="sm">Edit Order</Button>
                </Link> */}
                      <ButtonGroup>
                        {userData.adminCheck === true ? (
                          <Button
                            size="sm"
                            className="mr-2"
                            color="primary"
                            onClick={() => {
                              // getTable(order);
                              getSingleOrder(order);
                              toggle();
                            }}
                          >
                            Checkout
                          </Button>
                        ) : null}

                        <Button
                          size="sm"
                          color="warning"
                          className="mr-2"
                          onClick={() => {
                            editOrders(order);
                          }}
                        >
                          Edit Order
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => {
                            getSingleOrder(order);
                            toggle2();
                          }}
                        >
                          Cancel Order
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} charCode="x">
                        Confirmation
                      </ModalHeader>
                      <ModalBody>
                        <Container>Are you sure?</Container>
                      </ModalBody>
                      <ModalFooter>
                        <Link to={`/orders/${getOrder.oId}`}>
                          <Button
                            size="sm"
                            color="primary"
                            onClick={() => {
                              reservedCase(getOrder.tId);
                              addToReport();
                              toggle();
                              setTable(initialvaluefortable);
                              deleteOrdersForReport(getOrder.orderId);
                            }}
                          >
                            Yes
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => toggle()}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2}>
                      <ModalHeader toggle={toggle2} charCode="x">
                        Confirmation
                      </ModalHeader>
                      <ModalBody>
                        <Container>Are you sure?</Container>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          size="sm"
                          color="primary"
                          onClick={() => {
                            deleteOrders(getOrder.orderId, getOrder.tId);
                            toggle2();
                          }}
                        >
                          Yes
                        </Button>

                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => toggle2()}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Card>
                ))}
            </div>
          ) : (
            <Fragment>No orders yet</Fragment>
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default Orders;
