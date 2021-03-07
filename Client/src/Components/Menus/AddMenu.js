import React, { useState, Fragment, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CardFooter from "reactstrap/lib/CardFooter";

import { DataContext } from "../../Context/Data";
import MenuErrorNotice from "./MenuErrorNotice";

const AddMenu = ({ addMenu, toggleadd, error, setError }) => {
  const initialFormState = {
    itemName: "",
    imageUrl: "",
    quantity: 0,

    price: "",
    totalPrice: "",
  };

  const [menu, setMenu] = useState(initialFormState);
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMenu(menu);
    setMenu(initialFormState);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        {error && (
          <MenuErrorNotice
            message={error}
            clearError={() => setError(undefined)}
          />
        )}
        <FormGroup>
          <Label for="exampleEmail">Item name</Label>
          <Input
            type="text"
            name="itemName"
            value={menu.itemName}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Price</Label>
          <Input
            type="number"
            name="price"
            value={menu.price}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Image Url</Label>
          <Input
            type="text"
            name="imageUrl"
            value={menu.imageUrl}
            onChange={handleInputChange}
          />
        </FormGroup>

        <hr />
        <Button
          className="mr-2"
          size="sm"
          type="submit"
          // disabled={!user.lastName && !user.firstName && !user.address}
          color="primary"
        >
          Submit
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => {
            setError(undefined);
            toggleadd();
          }}
        >
          Cancel
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddMenu;
