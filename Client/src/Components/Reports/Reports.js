import React, { useContext, Fragment, useEffect, useState } from "react";
import { DataContext } from "../../Context/Data";
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
import { Link } from "react-router-dom";
import axios from "axios";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Reports = () => {
  const { reportValue } = useContext(DataContext);
  const [reports, setReports] = reportValue;
  const copyReports = [...reports];
  const reversedReports = copyReports.reverse();
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { filteredReportsValue } = useContext(DataContext);
  const [filteredReports, setFilteredReports] = filteredReportsValue;
  const { fetchReportsValue } = useContext(DataContext);
  const { fetchReports } = fetchReportsValue;
  const { loggedinValue } = useContext(DataContext);
  const [loggedinUser, setLoggedinUser] = loggedinValue;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [getReport, setGetReport] = useState({
    id: null,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // }, []);

  const deleteReports = async (id) => {
    await axios
      .delete(`/reports/delete/${id}`)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      );
    fetchReports();
  };

  const deleteAll = () => {
    axios.delete("/reports/delete");
  };

  const getSingleReport = (report) => {
    setGetReport({
      id: report._id,
    });
  };

  const getFilteredReports = () => {
    if (loggedinUser) {
      const data = reversedReports.filter(
        (item) => item.userId === loggedinUser.id
      );
      setFilteredReports(data);
    }
  };

  useEffect(() => {
    getFilteredReports();
  }, [reports]);

  const notify = (status, method) => {
    if (status === 200 && method === "delete") {
      toast.success("Successfully Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  };

  return (
    <Fragment>
      <div className="flexbetween">
        <h3 className="mb-1">
          {userData.adminCheck === true ? "Receipts" : "Order History"}
        </h3>
        {/* {userData.adminCheck === true ? (
          <Button color="danger" size="sm" onClick={() => deleteAll()}>
            Delete all
          </Button>
        ) : null} */}
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
            placeholder="Search "
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
          {reversedReports.length > 0 ? (
            <Table className="fontsizefortables" size="sm" responsive hover>
              <thead className="thead">
                <tr>
                  <th>Receipt No.</th>
                  <th>Created at</th>
                  <th>Order type</th>
                  <th>Ordered by</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {reversedReports
                  .filter((report) => {
                    if (searchTerm === "") {
                      return report;
                    }
                    if (
                      report.oId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return report;
                    }
                    if (
                      report.tableName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return report;
                    }
                    if (
                      report.displayName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return report;
                    }
                    if (
                      report.date.toString().toLowerCase().includes(searchTerm)
                    ) {
                      return report;
                    }
                  })
                  .map((report) => (
                    <tr className="tr" key={report._id}>
                      <td data-label="Receipt No." className="td">
                        {report.oId}
                      </td>
                      <td data-label="Create at" className="td">
                        {report.date}
                      </td>
                      <td data-label="Order type" className="td">
                        {report.tableName}
                      </td>
                      <td data-label="Ordered by" className="td">
                        {report.displayName}
                      </td>

                      <td data-label="Actions" className="td">
                        <Link to={`/reports/${report.oId}`}>
                          <Button
                            size="sm"
                            color="warning"
                            // onClick={() => editRow(menu)}
                            className="mr-2"
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => {
                            getSingleReport(report);
                            toggle();
                          }}
                        >
                          X
                        </Button>
                      </td>
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
                              deleteReports(getReport.id);
                              toggle();
                            }}
                          >
                            Yes
                          </Button>

                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => toggle()}
                          >
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            "No reports"
          )}
        </Container>
      ) : (
        <Container>
          {reversedReports.length > 0 ? (
            <Table className="fontsizefortables" size="sm" responsive hover>
              <thead className="thead">
                <tr>
                  <th>Receipt No.</th>
                  <th>Created at</th>
                  <th>Order Type</th>
                  <th>Ordered By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {filteredReports
                  .filter((report) => {
                    if (searchTerm === "") {
                      return report;
                    }
                    if (
                      report.oId
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return report;
                    }
                    if (
                      report.date.toString().toLowerCase().includes(searchTerm)
                    ) {
                      return report;
                    }
                  })
                  .map((report) => (
                    <tr className="tr" key={report._id}>
                      <td data-label="Receipt No." className="td">
                        {report.oId}
                      </td>
                      <td data-label="Create at" className="td">
                        {report.date}
                      </td>
                      <td data-label="Order type" className="td">
                        {report.tableName}
                      </td>
                      <td data-label="Ordered by" className="td">
                        {report.displayName}
                      </td>
                      <td data-label="Actions" className="td">
                        <Link to={`/reports/${report.oId}`}>
                          <Button
                            size="sm"
                            color="warning"
                            // onClick={() => editRow(menu)}
                            className="mr-2"
                          >
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            "No reports"
          )}
        </Container>
      )}
    </Fragment>
  );
};

export default Reports;
