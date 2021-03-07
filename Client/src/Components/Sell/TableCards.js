import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { DataContext } from "../../Context/Data";

toast.configure();

const TableCards = ({
  tableName,
  toggleTab,
  table,
  setTable,
  fetchTables,
  notify,
}) => {
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteTable = async (id) => {
    await axios
      .delete(`/tables/delete/${id}`)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      );
    fetchTables();
    // setTables(tables.filter((table) => table.tId !== tId));
  };

  const getTable = (table) => {
    setTable({
      id: table._id,
      tableName: table.tableName,
      reserved: table.reserved,
    });
  };

  return (
    <Fragment>
      <div key={table._id} className="cardsinsidetables">
        {/* <Card
          className={`mb-3 shadow rounded ${
            table.reserved === "true" ? "reservedColor" : ""
          }`}
        > */}
        <Card
          className="mb-3 shadow rounded"
          outline
          color={`${table.reserved === "true" ? "danger" : null}`}
        >
          <CardHeader>
            {" "}
            <div className="flexbetween">
              <div>
                <span>{tableName}</span>
              </div>
              {userData.adminCheck === true ? (
                <div>
                  <Button
                    color="danger"
                    size="sm"
                    className=" shadow rounded"
                    onClick={() => toggle()}
                  >
                    <i className="fas fa-times align-middle"></i>
                  </Button>
                </div>
              ) : null}
            </div>
          </CardHeader>
          <CardBody>
            <CardText>
              {" "}
              <legend>
                Status :{" "}
                <strong>
                  {table.reserved === "true" ? (
                    <i className="fas fa-times text-danger align-middle"></i>
                  ) : (
                    <i className="fas fa-check text-success align-middle"></i>
                  )}
                </strong>
              </legend>
            </CardText>
          </CardBody>
          <CardFooter>
            <Link to={`/sell/${table._id}/${table.tableName}`}>
              <Button
                className="not-allowed"
                size="sm"
                onClick={() => {
                  toggleTab("2");
                  getTable(table);
                  // selectedTable(table);
                }}
                color="primary"
                disabled={table.reserved === "true"}
              >
                Place Order
              </Button>
            </Link>
          </CardFooter>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} charCode="x">
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
                  deleteTable(table._id);
                  toggle();
                }}
              >
                Yes
              </Button>

              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  toggle();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      </div>
    </Fragment>
  );
};

export default TableCards;
