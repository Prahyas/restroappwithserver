import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Button, Table } from "reactstrap";
import Container from "reactstrap/lib/Container";
import { DataContext } from "../../Context/Data";
import { CardText, CardLink, CardTitle, CardSubtitle } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const MenuCard = () => {
  const { menuValue } = useContext(DataContext);
  const [menus] = menuValue;
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (_id) => {
    const check = cart.every((item) => {
      return item._id !== _id;
    });
    if (check) {
      const data = menus.filter((menu) => {
        return menu._id === _id;
      });
      setCart([...cart, ...data]);
      toast.success("Added to cart", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } else {
      toast.error("Already added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  };

  return (
    <Fragment>
      <Card className="menucard mb-3 shadow bg-white rounded">
        <CardHeader>
          {" "}
          <h5 className="classheaderspan">Select Items</h5>
        </CardHeader>
        <CardBody>
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
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Actions</th>
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
                          <td className=" align-middle">{menu.itemName}</td>
                          <td className=" align-middle">{menu.price}</td>
                          <td className=" align-middle">
                            <Button
                              className=" align-middle"
                              size="sm"
                              color="primary"
                              onClick={() => addToCart(menu._id)}
                            >
                              {" "}
                              +
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              ) : (
                <Fragment>
                  <div>Please add the Menus first</div>
                  <div>Go to</div>

                  <div>
                    <Link to="/menu">
                      <Button className="button" size="sm" color="primary">
                        <span>Menu page</span>
                      </Button>
                    </Link>
                  </div>
                </Fragment>
              )}
            </div>
          ) : (
            <div>
              {menus.length > 0 ? (
                <div className="flexevenly">
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
                      <Card
                        onClick={() => addToCart(menu._id)}
                        key={menu._id}
                        className="cardsinsidecurrent mb-3 shadow rounded"
                      >
                        <div className="menuimgdiv">
                          <img
                            className="menuImage"
                            width="100%"
                            src={`${menu.imageUrl}`}
                            alt="restro app"
                          />
                        </div>
                        <CardBody className="text-center">
                          <div className="menucardtitlediv">
                            <CardTitle>{menu.itemName}</CardTitle>
                          </div>
                          {/* <CardSubtitle tag="h6" className="mb-1 text-muted">
                          Category
                        </CardSubtitle> */}
                          <CardText>Rs. {menu.price}</CardText>
                        </CardBody>
                      </Card>
                    ))}
                </div>
              ) : (
                "Menu has not been added by the adminintrator"
              )}
            </div>
          )}

          {/* <Button className="btn btn-secondary">Add to Order List</Button> */}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MenuCard;
