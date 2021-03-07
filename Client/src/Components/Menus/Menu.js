import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/Data";
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import MenuTable from "./MenuTable";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Menu = () => {
  const { menuValue } = useContext(DataContext);
  const [menus, setMenus] = menuValue;
  const { fetchMenusValue } = useContext(DataContext);
  const { fetchMenus } = fetchMenusValue;
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    itemName: "",
    imageUrl: "",
    quantity: 0,
    price: "",
    totalPrice: "",
  };
  const [currentMenu, setcurrentMenu] = useState(initialFormState);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const [error, setError] = useState();

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

  // const headers = {
  //   "Content-Type": "application/json",
  //   // "x-auth-token": `${userData.token}`,
  //   "x-auth-token":
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmE2N2Y2ZWIzNjQ0MjZhMGYzYmY0MCIsImlhdCI6MTYxMDM1NTIyNn0.wmeViG95NKmWp-z9VtjIHMX8kldrVlI41T1__Nbz7DM",
  // };
  useEffect(() => {
    fetchMenus();
  }, []);

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

  const addMenu = async (menu) => {
    // user.id = Math.floor(Math.random() * 100);
    // setMenus([...menus, menu]);

    await axios
      .post("/menus/addmenu", menu)
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
    fetchMenus();
  };

  const deleteMenu = async (id) => {
    await setEditing(false);
    // setMenus(menus.filter((menu) => menu._id !== id));
    await axios
      .delete(`/menus/delete/${id}`)
      .then(
        (res) =>
          res.status &&
          res.config.method &&
          notify(res.status, res.config.method)
      );
    fetchMenus();
  };

  const updateMenu = async (id, updatedMenu) => {
    await setEditing(false);
    // setMenus(menus.map((menu) => (menu.mId === mId ? updatedMenu : menu)));
    await axios
      .put(`/menus/update/${id}`, updatedMenu)
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
    fetchMenus();
  };

  const editRow = (menu) => {
    setEditing(true);
    setcurrentMenu({
      id: menu._id,
      itemName: menu.itemName,
      imageUrl: menu.imageUrl,
      price: menu.price,
      quantity: 0,
      totalPrice: "",
    });
    toggleEdit();
  };

  return (
    <Fragment>
      <div className="flexbetween">
        <h3 className="mb-1">Menu</h3>
        {userData.adminCheck === true ? (
          <div>
            <Button color="primary" onClick={toggleAdd}>
              Add Menu
            </Button>
          </div>
        ) : null}
        {userData.adminCheck === false ? (
          <div>
            <Link to="/sell/:tId/:tableName">
              <Button size="sm" color="primary" onClick={toggleAdd}>
                Place an order
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
      <hr />
      <Modal isOpen={addModal} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd} close={closeBtnAdd}>
          Add menu item
        </ModalHeader>
        <ModalBody>
          <Container>
            <AddMenu
              addMenu={addMenu}
              toggleadd={toggleAdd}
              error={error}
              setError={setError}
            />
          </Container>
        </ModalBody>
      </Modal>
      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} close={closeBtnEdit}>
          Edit menu
        </ModalHeader>
        <ModalBody>
          <Container>
            <EditMenu
              currentMenu={currentMenu}
              updateMenu={updateMenu}
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
        <MenuTable menus={menus} editRow={editRow} deleteMenu={deleteMenu} />
      </Container>
    </Fragment>
  );
};

export default Menu;
