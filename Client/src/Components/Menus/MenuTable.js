import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

import { DataContext } from "../../Context/Data";

const MenuTable = ({ menus, deleteMenu, editRow }) => {
  const { userValue } = useContext(DataContext);
  const [userData, setUserData] = userValue;
  const [getMenu, setGetMenu] = useState({
    id: null,
  });
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggle = () => setModal(!modal);

  const getSingleMenu = (menu) => {
    setGetMenu({
      id: menu._id,
    });
  };

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
          {menus.length > 0 ? (
            <Table className="fontsizefortables" size="sm" responsive hover>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  {userData.adminCheck === true ? <th>Actions</th> : null}
                </tr>
              </thead>
              <tbody>
                {menus
                  .filter((menu) => {
                    if (searchTerm === "") {
                      return menu;
                    } else if (
                      menu.itemName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return menu;
                    }
                  })
                  .map((menu) => (
                    <tr key={menu._id}>
                      <td data-label="Item" className=" align-middle">
                        {menu.itemName}
                      </td>

                      <td data-label="Price" className=" align-middle">
                        {menu.price}
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
                              deleteMenu(getMenu.id);
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
                      {userData.adminCheck === true ? (
                        <td data-label="Actions" className=" align-middle">
                          <Button
                            size="sm"
                            color="warning"
                            onClick={() => editRow(menu)}
                            className="mr-2"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            onClick={() => {
                              getSingleMenu(menu);
                              toggle();
                            }}
                          >
                            X
                          </Button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            "Menu has not been added by the adminintrator"
          )}
        </div>
      ) : (
        <div>
          {menus.length > 0 ? (
            <div className="flexevenly">
              {menus.map((menu) => (
                <Card
                  key={menu._id}
                  className="cardsinsidemenus mb-3 shadow rounded"
                >
                  <img width="100%" src={`${menu.imageUrl}`} alt="restro app" />
                  <CardBody className="text-center">
                    <CardTitle tag="h5">{menu.itemName}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-1 text-muted">
                      Category
                    </CardSubtitle>
                    <CardText>Rs. {menu.price}</CardText>
                    {userData.adminCheck === true ? (
                      <div>
                        <Button
                          size="sm"
                          color="warning"
                          onClick={() => editRow(menu)}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => deleteMenu(menu._id)}
                        >
                          X
                        </Button>
                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            "Menu has not been added by the adminintrator"
          )}
        </div>
      )}
    </Fragment>
  );
};

export default MenuTable;
