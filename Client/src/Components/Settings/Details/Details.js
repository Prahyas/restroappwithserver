import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Context/Data";
import AddDetails from "./AddDetails";
import EditDetails from "./EditDetails";
import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
import DetailsList from "./DetailsList";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Details = () => {
  const { detailValue } = useContext(DataContext);
  const [details, setDetails] = detailValue;
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    restaurantName: "",
    address: "",
    contactNumber: "",
    serviceCharge: "",
    vat: "",
  };
  const [currentDetail, setcurrentDetail] = useState(initialFormState);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { fetchDetailsValue } = useContext(DataContext);
  const { fetchDetails } = fetchDetailsValue;
  const toggleAdd = () => setAddModal(!addModal);
  const toggleEdit = () => setEditModal(!editModal);
  const [error, setError] = useState();

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

  useEffect(() => {
    fetchDetails();
  }, []);

  const addDetail = async (detail) => {
    await axios
      .post("/details/adddetail", detail)
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
    fetchDetails();
  };
  const deleteDetail = async (id) => {
    await setEditing(false);
    // setMenus(menus.filter((menu) => menu._id !== id));
    await axios
      .delete(`/details/delete/${id}`)
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
    fetchDetails();
  };

  const updateDetail = async (id, updatedDetail) => {
    await setEditing(false);
    // setMenus(menus.map((menu) => (menu.mId === mId ? updatedMenu : menu)));
    await axios
      .put(`/details/update/${id}`, updatedDetail)
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
    fetchDetails();
  };

  const editRow = (detail) => {
    setEditing(true);
    setcurrentDetail({
      id: detail._id,
      restaurantName: detail.restaurantName,
      address: detail.address,
      contactNumber: detail.contactNumber,
      serviceCharge: detail.serviceCharge,
      vat: detail.vat,
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
      <div className="flexbetween">
        <h3 className="mb-1">Details</h3>
        {userData.adminCheck === true ? (
          <div>
            <Button
              color="primary"
              onClick={toggleAdd}
              disabled={details.length > 0}
              className="not-allowed"
            >
              Add Details
            </Button>
          </div>
        ) : null}
      </div>
      <hr />
      <Modal isOpen={addModal} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd} close={closeBtnAdd}>
          Add Detail
        </ModalHeader>
        <ModalBody>
          <Container>
            <AddDetails
              addDetail={addDetail}
              toggleadd={toggleAdd}
              error={error}
              setError={setError}
            />
          </Container>
        </ModalBody>
      </Modal>
      <Modal isOpen={editModal} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit} close={closeBtnEdit}>
          Edit Detail
        </ModalHeader>
        <ModalBody>
          <Container>
            <EditDetails
              currentDetail={currentDetail}
              updateDetail={updateDetail}
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
        <DetailsList
          details={details}
          editRow={editRow}
          deleteDetail={deleteDetail}
        />
      </Container>
    </Fragment>
  );
};

export default Details;

// import React, { Fragment, useContext, useState } from "react";
// import { DataContext } from "../../../Context/Data";
// import { Button, Container, Modal, ModalHeader, ModalBody } from "reactstrap";
// import AddSettings from "./AddDetails";
// import EditSettings from "./EditDetails";
// import SettingsDetail from "./DetailsList";

// const Details = () => {
//   const { settingValue } = useContext(DataContext);
//   const [settings, setSettings] = settingValue;
//   const [editing, setEditing] = useState(false);
//   const initialFormState = {
//     uId: null,
//     userName: "",
//     restaurantName: "",
//     address: "",
//     contactNumber: "",
//     serviceCharge: "",
//     vat: "",
//   };
//   const [currentSetting, setcurrentSetting] = useState(initialFormState);
//   const [addModal, setAddModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);

//   const toggleAdd = () => setAddModal(!addModal);
//   const toggleEdit = () => setEditModal(!editModal);

//   const addSetting = (setting) => {
//     setting.uId = 1;
//     setSettings([...settings, setting]);
//     toggleAdd();
//   };
//   const deleteSetting = (uId) => {
//     setEditing(false);
//     setSettings(settings.filter((setting) => setting.uId !== uId));
//   };

//   const updateSetting = (uId, updatedSetting) => {
//     setEditing(false);
//     setSettings(
//       settings.map((setting) =>
//         setting.uId === uId ? updatedSetting : setting
//       )
//     );
//   };
//   const editRow = (setting) => {
//     setEditing(true);
//     setcurrentSetting({
//       uId: setting.uId,
//       userName: setting.userName,
//       restaurantName: setting.restaurantName,
//       address: setting.address,
//       contactNumber: setting.contactNumber,
//       serviceCharge: setting.serviceCharge,
//       vat: setting.vat,
//     });
//     toggleEdit();
//   };

//   // useEffect(() => {
//   //   if (!userData.user) history.push("/login");
//   // }, []);

//   return (
//     <Fragment>
//       <div className="flexbetween">
//         <h3 className="mb-1">Restaurant details</h3>
//         <Button
//           disabled={settings.length === 1}
//           size="sm"
//           color="primary"
//           onClick={toggleAdd}
//         >
//           Add Information
//         </Button>
//       </div>
//       <hr />
//       <Modal isOpen={addModal} toggle={toggleAdd}>
//         <ModalHeader toggle={toggleAdd} charCode="x">
//           Add Information
//         </ModalHeader>
//         <ModalBody>
//           <Container>
//             <AddSettings addSetting={addSetting} toggleadd={toggleAdd} />
//           </Container>
//         </ModalBody>
//       </Modal>
//       <Modal isOpen={editModal} toggle={toggleEdit}>
//         <ModalHeader toggle={toggleEdit} charCode="x">
//           Edit Information
//         </ModalHeader>
//         <ModalBody>
//           <Container>
//             <EditSettings
//               currentSetting={currentSetting}
//               updateSetting={updateSetting}
//               editing={editing}
//               setEditing={setEditing}
//               toggleEdit={toggleEdit}
//             />
//           </Container>
//         </ModalBody>
//       </Modal>

//       <Container>
//         <SettingsDetail
//           settings={settings}
//           editRow={editRow}
//           deleteSetting={deleteSetting}
//         />
//       </Container>
//       <hr />
//     </Fragment>
//   );
// };

// export default Details;
