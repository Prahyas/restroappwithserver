import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/Data";
import TableCards from "./TableCards";
import { Button, Container } from "reactstrap";
import AddTables from "./AddTables";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import classnames from "classnames";
import { Link, useHistory } from "react-router-dom";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import MenuCard from "./MenuCard";
import ItemCart from "./ItemCart";
import axios from "axios";
import CurrentTab from "./CurrentTab";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Sell = ({ match }) => {
  const { tablesValue } = useContext(DataContext);
  const [tables, setTables] = tablesValue;
  const { fetchTablesValue } = useContext(DataContext);
  const { fetchTables } = fetchTablesValue;
  const { tableValue } = useContext(DataContext);
  const [table, setTable] = tableValue;
  const { initialvaluefortable } = useContext(DataContext);
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [error, setError] = useState();

  const history = useHistory();

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggle = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTable({ ...table, [name]: value });
  };

  useEffect(() => {
    fetchTables();
  }, []);
  const notify = (status, method) => {
    if (status === 200 && method === "post") {
      toast.success("Sucessfully Added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      toggle();
    }
    if (status === 200 && method === "delete") {
      toast.success("Sucessfully Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }

    if (status === 400 || status === 500) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }

    setError(undefined);
  };

  const addTable = async (table) => {
    // user.id = Math.floor(Math.random() * 100);
    // let filteredTable = tables.filter((x) => x.tableName !== table.tableName);
    // console.log({ filteredTable });
    // setTables([...filteredTable, table]);
    await axios
      .post("/tables/addtable", table)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      )
      .catch(
        (err) => err.response.data.msg && setError(err.response.data.msg)
        // console.error(err)
      );
    fetchTables();
  };
  const handleSubmit = async (e) => {
    await e.preventDefault();
    await addTable(table);
    await setTable(initialvaluefortable);
    // await toggle();
    fetchTables();
  };

  const fnCollection = (e) => {
    handleSubmit(e);
  };

  // const deleteAllTables = () => {
  //   axios.delete("/tables/delete");
  //   setTables([]);
  // };

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // }, []);

  const closeBtn = (
    <Button
      color="danger"
      size="sm"
      className="shadow rounded"
      onClick={() => {
        setError(undefined);
        toggle();
      }}
    >
      <i className="fas fa-times align-middle"></i>
    </Button>
  );

  return (
    <Fragment>
      <div className="flexbetween">
        <h3 className="mb-1">
          {userData.adminCheck === true ? "Sell" : "Place an Order"}
        </h3>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Add a table
        </ModalHeader>
        <ModalBody>
          <Container>
            <br />
            <AddTables
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              table={table}
              error={error}
              setError={setError}
            />
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={fnCollection}>
            Add
          </Button>{" "}
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              setError(undefined);
              toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <hr />
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggleTab("1");
            }}
          >
            Order
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggleTab("2");
            }}
            disabled
          >
            Current
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {userData.adminCheck === true ? (
                <div className="mt-3 text-right">
                  <Button color="primary" onClick={toggle}>
                    Add Tables
                  </Button>
                  {/* <Button size="sm" color="danger" onClick={deleteAllTables}>
                    Delete All
                  </Button> */}
                </div>
              ) : null}
              <div className="mt-3 mb-3">
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
              </div>
              {tables ? (
                <div>
                  {userData.adminCheck === true ? (
                    <div className="flexevenly mt-4">
                      {tables
                        .filter((table) => {
                          if (searchTerm === "") {
                            return table;
                          } else if (
                            table.tableName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return table;
                          }
                        })
                        .map((table) => (
                          <div key={table._id}>
                            <TableCards
                              tableName={table.tableName}
                              tables={tables}
                              setTables={setTables}
                              toggleTab={toggleTab}
                              table={table}
                              setTable={setTable}
                              fetchTables={fetchTables}
                              notify={notify}
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button
                        className="mt-3 "
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        See Menus
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <h3 className="mt-5 text-center">
                  Tables has not been added by the admin
                </h3>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <CurrentTab
            match={match}
            table={table}
            tables={tables}
            setTables={setTables}
            setTable={setTable}
          />
          {/* <div className="mt-2">
            <MenuCard />

            <ItemCart
              className="d-none"
              match={match}
              table={table}
              tables={tables}
              setTables={setTables}
              setTable={setTable}
            />
          </div> */}
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default Sell;
