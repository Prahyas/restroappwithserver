import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Table, Button } from "reactstrap";
import { DataContext } from "../../../Context/Data";
import { ListGroup, ListGroupItem } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const UsersList = ({ deleteUser, editRow }) => {
  const { userListValue } = useContext(DataContext);
  const [userLists, setUserLists] = userListValue;
  const { userValue } = useContext(DataContext);
  const [userData, setUserData] = userValue;
  const { loggedinValue } = useContext(DataContext);
  const [loggedinUser, setLoggedinUser] = loggedinValue;
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const getFilteredUser = () => {
    if (loggedinUser) {
      const data = userLists.filter((item) => item.email === userData.email);
      setFilteredUser(data);
    }
  };

  useEffect(() => {
    getFilteredUser();
  }, [userLists]);

  useEffect(() => {
    console.log({ userLists });
  }, [userLists]);
  return (
    <Fragment>
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
      </div>
      {userData.adminCheck === true ? (
        <div>
          {userLists ? (
            <Table className="fontsizefortables" size="sm" responsive hover>
              <thead className="thead">
                <tr>
                  <th>Admin</th>
                  <th>Email</th>
                  <th>Display Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {userLists
                  .filter((user) => {
                    if (searchTerm === "") {
                      return user;
                    }
                    if (
                      user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                    if (
                      user.displayName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                    if (
                      user.address
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                    if (
                      user.contact
                        .toString()
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                  })
                  .map((userList) => (
                    <tr className="tr" key={userList._id}>
                      {/* <td>{JSON.stringify(userList.adminCheck)}</td> */}
                      <td data-label="Admin" className="td">
                        {userList.adminCheck === true ? (
                          <i className="fas fa-check text-success align-middle"></i>
                        ) : (
                          <i className="fas fa-times text-danger align-middle"></i>
                        )}
                      </td>
                      <td data-label="Email" className="td">
                        {userList.email}
                      </td>
                      <td data-label="Display Name" className="td">
                        {userList.displayName}
                      </td>
                      <td data-label="Address" className="td">
                        {userList.address}
                      </td>
                      <td data-label="Contact" className="td">
                        {userList.contact}
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
                              deleteUser(userList._id);
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
                      <td data-label="Actions" className="td">
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() => editRow(userList)}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => toggle()}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            "No users at the moment"
          )}
        </div>
      ) : (
        <div>
          {userLists ? (
            <div>
              {filteredUser.map((filteredUser) => (
                <ListGroup className="text-center">
                  <ListGroupItem>
                    Admin :{" "}
                    {filteredUser.adminCheck === true ? (
                      <i className="fas fa-check text-success align-middle"></i>
                    ) : (
                      <i className="fas fa-times text-danger align-middle"></i>
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    Email : <strong>{filteredUser.email}</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    Display Name : <strong>{filteredUser.displayName}</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    Address : <strong>{filteredUser.address}</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    Contact : <strong>{filteredUser.contact}</strong>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button
                      size="sm"
                      color="warning"
                      onClick={() => editRow(filteredUser)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => deleteUser(filteredUser._id)}
                    >
                      X
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              ))}
            </div>
          ) : (
            // <Table className="fontsizefortables" size="sm" responsive>
            //   <thead>
            //     <tr>
            //       <th>Admin</th>
            //       <th>Email</th>
            //       <th>Display Name</th>
            //       <th>Address</th>
            //       <th>Contact</th>
            //       <th>Actions</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {filteredUser.map((userList) => (
            //       <tr key={userList._id}>
            //         <td>{JSON.stringify(userList.adminCheck)}</td>
            //         <td>{userList.email}</td>
            //         <td>{userList.displayName}</td>
            //         <td>{userList.address}</td>
            //         <td>{userList.contact}</td>

            //         <td>
            //           <Button
            //             size="sm"
            //             color="warning"
            //             onClick={() => editRow(userList)}
            //             className="mr-2"
            //           >
            //             Edit
            //           </Button>
            //           <Button
            //             size="sm"
            //             color="danger"
            //             onClick={() => deleteUser(userList._id)}
            //           >
            //             X
            //           </Button>
            //         </td>
            //       </tr>
            //     ))}
            //   </tbody>
            // </Table>
            "No users at the moment"
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UsersList;
