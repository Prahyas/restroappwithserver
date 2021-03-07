import React, { useContext } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { DataContext } from "../../../Context/Data";

const Instructions = () => {
  const { userValue } = useContext(DataContext);
  const [userData] = userValue;

  return (
    <div>
      <h3 className="mb-1">Instructions</h3>
      <hr />
      <Container className="mt-3 mb-3">
        {userData.adminCheck === true ? (
          <div>
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading>1) Add menu items.</ListGroupItemHeading>
                <ListGroupItemText>
                  You can add menu items, price and it's respective image that
                  is available on your restaurant.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  2) Place Order via Sell page.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  You can add required number of tables. And to place an order
                  just select your table name and click the Place order button.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  3) Adding items to cart.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  Items can be selected from the menu page and are added to cart
                  where you can increase or decrease the quantity of the ordered
                  items. Then you just click on to Order Ticket button.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  4) View active orders via Orders page.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  Al the active orders are shown here. You can checkout or edit
                  the order or you can cancel the order from here. After
                  customer are done you can checkout the order to generate a
                  receipt.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  5) View all the sales via Receipts page.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  Detailed receipts for every sales. You can filter the receipts
                  as per required.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  6) Add information of your Restaurant.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  Here you are supposed to add detailed information about your
                  restaurant. Also service charge and vat included.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  6) Manage all users.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  You can manage your employees or the customers that are
                  registered in this web app. You can change their information
                  including their emails and passwords.
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </div>
        ) : (
          <div>
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading>
                  1) Place Order via Place Order page.
                </ListGroupItemHeading>
                <ListGroupItemText>
                  You can add the items that you like to order. The items are
                  added to cart. Then you can click Order Ticket to place your
                  order.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  2) Order Confirmation
                </ListGroupItemHeading>
                <ListGroupItemText>
                  The order you placed will be seen by the admin and the admin
                  confirms your order and will let you know.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>3) Just wait</ListGroupItemHeading>
                <ListGroupItemText>
                  After you receive the confirmation notification. You just wait
                  till your food gets delivered to you.
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  4) Review all the orders
                </ListGroupItemHeading>
                <ListGroupItemText>
                  All your past order history is shown here. You can search your
                  receipt according to your requirement.
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Instructions;
