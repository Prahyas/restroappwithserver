import React, { useState, Fragment } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import MenuErrorNotice from "./MenuErrorNotice";

const EditMenu = ({
  updateMenu,
  currentMenu,
  setEditing,
  editing,
  toggleEdit,
  error,
  setError,
}) => {
  const [menu, setMenu] = useState(currentMenu);

  //   useEffect(() => {
  //     setMenu(currentMenu);
  //   }, [updateMenu, currentMenu, setEditing, editing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMenu(menu.id, menu);
    // toggleEdit();
  };

  return (
    <div>
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
              type="input"
              name="itemName"
              value={menu.itemName}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Price</Label>
            <Input
              type="input"
              name="price"
              value={menu.price}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Image Url</Label>
            <Input
              type="input"
              name="imageUrl"
              value={menu.imageUrl}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button className="mr-2" size="sm" color="warning">
            Update
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              setEditing(false);
              setError(undefined);
              toggleEdit();
            }}
            className="Button muted-button"
          >
            Cancel
          </Button>
        </Form>
      </Fragment>
    </div>
  );
};

export default EditMenu;
