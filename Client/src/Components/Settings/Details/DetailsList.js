import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Table, Button } from "reactstrap";
import { DataContext } from "../../../Context/Data";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const DetailsList = ({ details, deleteDetail, editRow }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Fragment>
      {details.length > 0 ? (
        <div>
          {details.map((detail) => (
            <ListGroup className="text-center">
              <ListGroupItem>
                Restaurant Name : <strong>{detail.restaurantName}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Address : <strong>{detail.address}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Contact : <strong>{detail.contactNumber}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Service Charge (%) : <strong>{detail.serviceCharge}</strong>
              </ListGroupItem>
              <ListGroupItem>
                Vat (%) : <strong>{detail.vat}</strong>
              </ListGroupItem>
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
                      deleteDetail(detail._id);
                      toggle();
                    }}
                  >
                    Yes
                  </Button>

                  <Button size="sm" color="danger" onClick={() => toggle()}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <ListGroupItem>
                <Button
                  size="sm"
                  color="warning"
                  onClick={() => editRow(detail)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => {
                    toggle();
                  }}
                  // onClick={() => deleteDetail(detail._id)}
                >
                  X
                </Button>
              </ListGroupItem>
            </ListGroup>
          ))}
        </div>
      ) : (
        "Details has not been added by the admin"
      )}
      {/* {details.length > 0 ? (
        <Table className="fontsizefortables" size="sm" responsive>
          <thead>
            <tr>
              <th>Restaurant Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Service Charge</th>
              <th>Vat</th>
              {userData.adminCheck === true ? <th>Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr key={detail._id}>
                <td>{detail.restaurantName}</td>

                <td>{detail.address}</td>
                <td>{detail.contactNumber}</td>
                <td>{detail.serviceCharge}</td>
                <td>{detail.vat}</td>
                {userData.adminCheck === true ? (
                  <td>
                    <Button
                      size="sm"
                      color="warning"
                      onClick={() => editRow(detail)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => deleteDetail(detail._id)}
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
        "Details has not been added by the admin"
      )} */}
    </Fragment>
  );
};

export default DetailsList;

// import React, { Fragment } from 'react';
// import { Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';

// const SettingsDetail = ({ settings, deleteSetting, editRow }) => {
// 	return (
// 		<Fragment>
// 			{settings.length > 0 ? (
// 				<Fragment>
// 					{settings.map((setting) => (
// 						<Card key={setting.uId} className="mb-3 shadow bg-white rounded">
// 							<CardHeader>
// 								<div className="flexbetween">
// 									<div>
// 										<h4>Details</h4>
// 									</div>
// 									<div>
// 										<Button
// 											size="sm"
// 											color="danger"
// 											onClick={() => deleteSetting(setting.uId)}
// 										>
// 											<i className="fas fa-times"></i>
// 										</Button>
// 									</div>
// 								</div>
// 							</CardHeader>
// 							<CardBody>
// 								<div className="flexbetween">
// 									<span>
// 										<strong> User Name</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.userName}</strong>
// 									</span>
// 								</div>
// 								<hr />

// 								<div className="flexbetween">
// 									<span>
// 										<strong>Restaurant</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.restaurantName}</strong>
// 									</span>
// 								</div>
// 								<hr />

// 								<div className="flexbetween">
// 									<span>
// 										<strong>Address</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.address}</strong>
// 									</span>
// 								</div>
// 								<hr />

// 								<div className="flexbetween">
// 									<span>
// 										<strong> Contact</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.contactNumber}</strong>
// 									</span>
// 								</div>
// 								<hr />

// 								<div className="flexbetween">
// 									<span>
// 										<strong>Service Charge</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.serviceCharge}</strong>
// 									</span>
// 								</div>
// 								<hr />

// 								<div className="flexbetween">
// 									<span>
// 										<strong>VAT</strong>
// 									</span>

// 									<span>
// 										{' '}
// 										<strong> {setting.vat}</strong>
// 									</span>
// 								</div>
// 							</CardBody>
// 							<CardFooter>
// 								<Button onClick={() => editRow(setting)}>Edit</Button>
// 							</CardFooter>
// 						</Card>
// 					))}
// 				</Fragment>
// 			) : (
// 				<Fragment>
// 					<Card className="mb-3 shadow bg-white rounded">
// 						<CardHeader>
// 							<h4>Details</h4>
// 						</CardHeader>
// 						<CardBody>
// 							<div className="flexbetween">
// 								<span>
// 									<strong> User Name</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong>Not Specified</strong>
// 								</span>
// 							</div>
// 							<hr />

// 							<div className="flexbetween">
// 								<span>
// 									<strong>Restaurant</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong>Not Specified</strong>
// 								</span>
// 							</div>
// 							<hr />

// 							<div className="flexbetween">
// 								<span>
// 									<strong>Address</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong> Not Specified</strong>
// 								</span>
// 							</div>
// 							<hr />

// 							<div className="flexbetween">
// 								<span>
// 									<strong> Contact</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong>Not Specified</strong>
// 								</span>
// 							</div>
// 							<hr />

// 							<div className="flexbetween">
// 								<span>
// 									<strong>Service Charge</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong> Not Specified</strong>
// 								</span>
// 							</div>
// 							<hr />

// 							<div className="flexbetween">
// 								<span>
// 									<strong>VAT</strong>
// 								</span>

// 								<span>
// 									{' '}
// 									<strong> Not Specified</strong>
// 								</span>
// 							</div>
// 						</CardBody>
// 						<CardFooter>
// 							Please add the details using the add button above
// 						</CardFooter>
// 					</Card>
// 				</Fragment>
// 			)}
// 		</Fragment>
// 	);
// };

// export default SettingsDetail;
