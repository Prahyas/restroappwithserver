import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/Data";
import EditUsers from "./EditUsers";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import UsersList from "./UsersList";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "reactstrap/lib/Spinner";

toast.configure();

const Users = () => {
  const { userListValue } = useContext(DataContext);
  const [userLists, setUserLists] = userListValue;
  const { fetchUserListsValue } = useContext(DataContext);
  const { fetchUserLists } = fetchUserListsValue;
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    email: "",
    password: "",
    passwordCheck: "",
    displayName: "",
    adminCheck: "",
    address: "",
    contact: "",
  };
  const [currentUser, setcurrentUser] = useState(initialFormState);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState();
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const toggleAdd = () => setAddModal(!addModal);
  const toggleEdit = () => setEditModal(!editModal);
  const closeBtnAdd = (
    <Button
      color="danger"
      size="sm"
      className="shadow rounded"
      onClick={() => {
        setError(undefined);
        toggleAdd();
      }}
    >
      <i className="fas fa-times align-middle"></i>
    </Button>
  );
  const closeBtnEdit = (
    <Button
      color="danger"
      size="sm"
      className="shadow rounded"
      onClick={() => {
        setError(undefined);
        toggleEdit();
      }}
    >
      <i className="fas fa-times align-middle"></i>
    </Button>
  );

  const [error, setError] = useState();

  // const headers = {
  //   "Content-Type": "application/json",
  //   // "x-auth-token": `${userData.token}`,
  //   "x-auth-token":
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmE2N2Y2ZWIzNjQ0MjZhMGYzYmY0MCIsImlhdCI6MTYxMDM1NTIyNn0.wmeViG95NKmWp-z9VtjIHMX8kldrVlI41T1__Nbz7DM",
  // };

  // const addDetail = (detail) => {
  //   // user.id = Math.floor(Math.random() * 100);
  //   // setMenus([...menus, menu]);
  //   toggleAdd();
  //   axios
  //     .post("/details/adddetail", detail)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));
  // };

  useEffect(() => {
    fetchUserLists();
  }, []);

  useEffect(() => {
    if ((userLists == undefined) | (userLists.length === 0)) {
      setLoading(true);
      console.log({ loading });
    } else {
      setLoading(false);
      console.log({ loading });
    }
  }, [userLists]);

  const deleteUser = async (id) => {
    await setEditing(false);
    // setMenus(menus.filter((menu) => menu._id !== id));
    await axios
      .delete(`/users/delete/${id}`)
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
    fetchUserLists();
  };

  const updateUser = async (id, updatedUser) => {
    await setEditing(false);
    // setMenus(menus.map((menu) => (menu.mId === mId ? updatedMenu : menu)));
    await axios
      .put(`/users/update/${id}`, updatedUser)
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
    fetchUserLists();
  };

  const editRow = (userList) => {
    setEditing(true);
    setcurrentUser({
      id: userList._id,
      email: userList.email,
      password: "",
      passwordCheck: "",
      displayName: userList.displayName,
      adminCheck: userList.adminCheck,
      address: userList.address,
      contact: userList.contact,
    });
    toggleEdit();
  };

  const notify = (status, method) => {
    if (status === 200 && method === "post") {
      toast.success("Sucessfully Added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      toggleAdd();
    }
    if (status === 200 && method === "delete") {
      toast.success("Sucessfully Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
    if (status === 200 && method === "put") {
      toast.success("Sucessfully Updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      toggleEdit();
    }
    if (status === 400 || status === 500) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }

    setError(undefined);
  };

  return (
    <Fragment>
      <h3 className="mb-1">
        {userData.adminCheck === true ? "Manage Users" : "Edit Profile"}
      </h3>
      <hr />

      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} close={closeBtnEdit}>
          Edit User
        </ModalHeader>
        <ModalBody>
          <Container>
            <EditUsers
              currentUser={currentUser}
              updateUser={updateUser}
              editing={editing}
              setEditing={setEditing}
              toggleEdit={toggleEdit}
              error={error}
              setError={setError}
            />
          </Container>
        </ModalBody>
      </Modal>

      <Container>
        {loading ? (
          <div className="text-center">
            <Spinner size="lg" color="secondary" />
          </div>
        ) : (
          <UsersList editRow={editRow} deleteUser={deleteUser} />
        )}
      </Container>
    </Fragment>
  );
};

export default Users;
