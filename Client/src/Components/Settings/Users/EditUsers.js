import React, { useState, Fragment, useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { DataContext } from "../../../Context/Data";
import UsersErrorNotice from "./UsersErrorNotice";

const EditUsers = ({
  updateUser,
  currentUser,
  setEditing,
  editing,
  toggleEdit,
  error,
  setError,
}) => {
  const [userList, setUserList] = useState(currentUser);

  //   useEffect(() => {
  //     setMenu(currentMenu);
  //   }, [updateMenu, currentMenu, setEditing, editing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserList({ ...userList, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(userList.id, userList);
  };

  useEffect(() => {
    console.log(userList.id);
  }, [userList]);

  return (
    <div>
      <Fragment>
        <Form onSubmit={handleSubmit}>
          {error && (
            <UsersErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <FormGroup>
            <Label for="exampleEmail" className="d-none">
              Admin Check
            </Label>
            <Input
              className="d-none"
              disabled
              type="input"
              name="adminCheck"
              value={userList.adminCheck}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              value={userList.email}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">New OR Old Password</Label>
            <Input
              type="password"
              name="password"
              value={userList.password || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Re-enter password</Label>
            <Input
              type="password"
              name="passwordCheck"
              value={userList.passwordCheck || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Display name</Label>
            <Input
              type="input"
              name="displayName"
              value={userList.displayName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Address</Label>
            <Input
              type="input"
              name="address"
              value={userList.address}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Contact</Label>
            <Input
              type="input"
              name="contact"
              value={userList.contact}
              onChange={handleInputChange}
            />
          </FormGroup>

          <Button size="sm" color="primary">
            Update
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              setError(undefined);
              setEditing(false);
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

export default EditUsers;
