import React, { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/Data";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

import { Button, Card, CardBody, CardHeader, Table } from "reactstrap";

const OrderDetails = ({ match }) => {
  const { orderValue } = useContext(DataContext);
  const [orders] = orderValue;
  const { singleOrderValue } = useContext(DataContext);
  const [singleOrder, setSingleOrder] = singleOrderValue;
  const { detailValue } = useContext(DataContext);
  const [details, setDetails] = detailValue;
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;
  const { loggedinValue } = useContext(DataContext);
  const [loggedinUser, setLoggedinUser] = loggedinValue;

  // const userName = settings.map((x) => {
  //   return x.userName;
  // });

  const restaurantName = details.map((x) => {
    return x.restaurantName;
  });
  const address = details.map((x) => {
    return x.address;
  });
  const contactNumber = details.map((x) => {
    return x.contactNumber;
  });
  const serviceCharge = details.map((x) => {
    return x.serviceCharge;
  });
  const vat = details.map((x) => {
    return x.vat;
  });
  const finalPrice = singleOrder.map((x) => {
    return x.finalPrice;
  });

  const addedServiceCharge = (finalPrice * serviceCharge) / 100;
  const addedVat = (finalPrice * vat) / 100;
  const grandTotal = (
    parseFloat(finalPrice) +
    parseFloat(addedServiceCharge) +
    parseFloat(addedVat)
  ).toFixed(2);
  console.log(grandTotal);

  const getSingleOrder = () => {
    if (match.params.oId) {
      const data = orders.filter((item) => item.oId === match.params.oId);
      setSingleOrder(data);
    }
  };

  // const pdf = () => {
  // html2canvas(document.querySelector('#capture')).then((canvas) => {
  // 	document.body.appendChild(canvas); // if you want see your screenshot in body.
  // 	const imgData = canvas.toDataURL('image/png');
  // 	const pdf = new jsPDF();
  // 	pdf.addImage(imgData, 'PNG', 0, 0);
  // 	pdf.save('download.pdf');
  // });
  // html2canvas(document.querySelector("#capture")).then((canvas) => {
  //   const imgData = canvas.toDataURL("image/png");
  // const pdf = new jsPDF({
  // 	orientation: 'landscape',
  // });
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     const filename = singleOrder.map((x) => {
  //       return x.tableName;
  //     });
  //     const date = singleOrder.map((x) => {
  //       return x.date;
  //     });

  //     pdf.setFontSize(100);
  //     pdf.save(`${filename}-${date}.pdf`);
  //   });
  // };

  useEffect(() => {
    getSingleOrder();
  }, []);

  // const print = () => {
  // 	let content = document.getElementById('printarea');
  // 	let pri = document.getElementById('ifmcontentstoprint').contentWindow;
  // 	pri.document.open();
  // 	pri.document.write(content.innerHTML);
  // 	pri.document.close();
  // 	pri.focus();
  // 	pri.print();
  // };
  const print = () => {
    window.print();
  };

  return (
    <Fragment>
      <div className="flexbetween">
        <h3 className="mb-1">Invoice </h3>
        <div className="downloadprinticons">
          {/* <Button size="sm" className="mr-2" onClick={() => pdf()}>
						<i className="fa fa-download" aria-hidden="true"></i>
					</Button> */}
          <Button size="sm" onClick={() => print()}>
            <i className="mr-2 fas fa-print align-middle"></i>
            <span className="align-middle">Print</span>
          </Button>
        </div>
      </div>
      <hr />
      {/* <iframe
				title="orderiframe"
				id="ifmcontentstoprint"
				style={{
					height: '0px',
					width: '0px',
					position: 'absolute',
					display: 'none',
				}}
			></iframe> */}
      {/* <span className="note">
				<strong>
					Note : To download and print via mobile please change the orientation
					to landscape mode and make sure that you check on view as desktop mode
					on the browser.
				</strong>
			</span> */}

      <div id="printarea" className="mt-4">
        {singleOrder.map((order) => (
          <Card key={singleOrder._id} className="mb-3 shadow bg-white rounded">
            <div id="capture">
              <CardHeader>
                <div className="text-center font-weight-bold mb-2">
                  <legend className="d-block">
                    {details.length === 0
                      ? "Restaurant App"
                      : `${restaurantName}`}
                  </legend>
                  <span className="d-block">{address}</span>
                  <span className="d-block">{contactNumber}</span>
                </div>
                <div className="block">
                  <div className="flexbetween">
                    <span> Order Date :</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flexbetween">
                    <span>Order Id :</span>
                    <span>{order.oId}</span>
                  </div>
                  <div className="flexbetween">
                    <span> Order Type :</span>
                    <span>{order.tableName}</span>
                  </div>
                  <div className="flexbetween">
                    <span>Ordered By :</span>
                    <span>{order.displayName}</span>
                  </div>
                  {userData.adminCheck === false ? (
                    <div>
                      <div className="flexbetween">
                        <span>User address :</span>
                        <span>{order.customerAddress}</span>
                      </div>
                      <div className="flexbetween">
                        <span>User contact :</span>
                        <span>{order.customerContact}</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="flexbetween">
                    <span>Cashier :</span>
                    <span>Admin</span>
                  </div>
                </div>
              </CardHeader>

              <CardBody>
                <Table className="fontsizefortables" size="sm" responsive hover>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart.map((x) => (
                      <tr key={x._id}>
                        <td>{x.itemName}</td>

                        <td>{x.price}</td>
                        <td>{x.quantity}</td>
                        <td>{x.totalPrice}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    {singleOrder.map((x) => (
                      <tr key={x.oId}>
                        <td colSpan={3}>
                          <strong>Total</strong>
                        </td>

                        <td>
                          <strong>{x.finalPrice}</strong>
                        </td>
                      </tr>
                    ))}
                    <tr className={serviceCharge.length > 0 ? "" : "none"}>
                      <td colSpan={3}>Service Charge ({serviceCharge}%)</td>
                      <td>{addedServiceCharge}</td>
                    </tr>

                    <tr className={vat.length > 0 ? "" : "none"}>
                      <td colSpan={3}>Vat ({vat}%)</td>
                      <td>{addedVat}</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <strong>Grand Total</strong>{" "}
                      </td>
                      <td>
                        <strong>
                          {serviceCharge.length > 0 && vat.length > 0
                            ? grandTotal
                            : finalPrice}
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
                {/* <h3>{serviceCharge.length > 0 ? 'none' : 'abc'}</h3> */}
              </CardBody>
            </div>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default OrderDetails;
