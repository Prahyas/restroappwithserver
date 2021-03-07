import React, { useContext } from "react";
import { Fragment } from "react";
import { DataContext } from "../../Context/Data";
import ItemCart from "./ItemCart";
import MenuCard from "./MenuCard";

const CurrentTab = ({ match, table, tables, setTables, setTable }) => {
  const { cartValue } = useContext(DataContext);
  const [cart, setCart] = cartValue;

  return (
    <Fragment>
      <div className="mt-2">
        <div className="mt-2 mb-2 flexbetween ">
          <h4>Cart</h4>
          <a
            href="#cart"
            className="float-right text-decoration-none text-dark"
          >
            <i className="fas fa-shopping-cart align-middle cart-icon "></i>
            <span className="badge badge-warning" id="lblCartCount">
              {" "}
              {cart.length}{" "}
            </span>
          </a>
        </div>
        <MenuCard />
        <div className="" id="cart">
          <ItemCart
            match={match}
            table={table}
            tables={tables}
            setTables={setTables}
            setTable={setTable}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CurrentTab;
