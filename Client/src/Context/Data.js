import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [tables, setTables] = useState([]);
  const initialFormState = {
    tableName: "",
    reserved: "false",
  };

  const [table, setTable] = useState(initialFormState);
  const [menus, setMenus] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([]);
  const [getOrder, setGetOrder] = useState({
    oId: null,
  });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [singleOrder, setSingleOrder] = useState([]);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [singleReport, setSingleReport] = useState([]);
  const [details, setDetails] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [loggedinUser, setLoggedinUser] = useState([]);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    id: undefined,
    displayName: undefined,
    email: undefined,
  });

  useEffect(() => {
    const getLocal = () => {
      if (localStorage.getItem("tables") === null) {
        localStorage.setItem("tables", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("tables"));
        setTables(localDb);
      }
      if (localStorage.getItem("menus") === null) {
        localStorage.setItem("menus", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("menus"));
        setMenus(localDb);
      }
      // if (localStorage.getItem("cart") === null) {
      //   localStorage.setItem("cart", JSON.stringify([]));
      // } else {
      //   let localDb = JSON.parse(localStorage.getItem("cart"));
      //   setCart(localDb);
      // }
      if (localStorage.getItem("orders") === null) {
        localStorage.setItem("orders", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("orders"));
        setOrders(localDb);
      }
      if (localStorage.getItem("filteredOrders") === null) {
        localStorage.setItem("filteredOrders", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("filteredOrders"));
        setFilteredOrders(localDb);
      }
      if (localStorage.getItem("singleOrder") === null) {
        localStorage.setItem("singleOrder", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("singleOrder"));
        setSingleOrder(localDb);
      }
      if (localStorage.getItem("reports") === null) {
        localStorage.setItem("reports", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("reports"));
        setReports(localDb);
      }
      if (localStorage.getItem("filteredReports") === null) {
        localStorage.setItem("filteredReports", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("filteredReports"));
        setFilteredReports(localDb);
      }
      if (localStorage.getItem("singleReport") === null) {
        localStorage.setItem("singleReport", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("singleReport"));
        setSingleReport(localDb);
      }
      if (localStorage.getItem("details") === null) {
        localStorage.setItem("details", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("details"));
        setDetails(localDb);
      }
      if (localStorage.getItem("userData") === null) {
        localStorage.setItem("userData", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("userData"));
        setUserData(localDb);
      }
      if (localStorage.getItem("loggedinUser") === null) {
        localStorage.setItem("loggedinUser", JSON.stringify([]));
      } else {
        let localDb = JSON.parse(localStorage.getItem("loggedinUser"));
        setLoggedinUser(localDb);
      }
    };
    getLocal();
  }, []);

  useEffect(() => {
    const saveLocal = () => {
      localStorage.setItem("tables", JSON.stringify(tables));
      localStorage.setItem("menus", JSON.stringify(menus));
      localStorage.setItem("orders", JSON.stringify(orders));
      // localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("filteredOrders", JSON.stringify(filteredOrders));
      localStorage.setItem("singleOrder", JSON.stringify(singleOrder));
      localStorage.setItem("reports", JSON.stringify(reports));
      localStorage.setItem("filteredReports", JSON.stringify(filteredReports));
      localStorage.setItem("singleReport", JSON.stringify(singleReport));
      localStorage.setItem("details", JSON.stringify(details));
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("loggedinUser", JSON.stringify(loggedinUser));
    };
    saveLocal();
  }, [
    tables,
    menus,
    orders,
    // cart,
    filteredOrders,
    singleOrder,
    reports,
    filteredReports,
    singleReport,
    details,
    userData,
    loggedinUser,
  ]);

  const fetchMenus = () => {
    axios.get("/menus/allmenu").then((resp) => {
      setMenus(resp.data);
    });
  };
  const fetchTables = () => {
    axios.get("/tables/alltable").then((res) => {
      setTables(res.data);
    });
  };
  const fetchOrders = (params) => {
    axios.get("/orders/allorder").then((resp) => {
      setOrders(resp.data);
    });
  };
  const fetchReports = () => {
    axios.get("/reports/allreport").then((resp) => {
      setReports(resp.data);
    });
  };
  const fetchDetails = () => {
    axios.get("/details/alldetail").then((resp) => {
      setDetails(resp.data);
    });
  };

  const fetchUserLists = () => {
    axios.get("/users/allusers").then((resp) => {
      setUserLists(resp.data);
    });
  };

  const fetchLoggedInUser = () => {
    let token = localStorage.getItem("auth-token");
    axios
      .get("/users/getloggedinuser", {
        headers: { "x-auth-token": token },
      })
      .then((resp) => {
        setLoggedinUser(resp.data);
      });
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/users/getloggedinuser", {
          headers: { "x-auth-token": token },
        });
        const { id, displayName, email, adminCheck } = userRes.data;
        // console.log(id, displayName, email);
        setUserData({
          token,
          user: userRes.data,
          id,
          displayName,
          email,
          adminCheck,
        });
      }
    };

    checkLoggedIn();
    fetchLoggedInUser();
    fetchMenus();
    fetchTables();
    fetchOrders();
    fetchReports();
    fetchDetails();
    fetchUserLists();
  }, []);

  return (
    <DataContext.Provider
      value={{
        toggleValue: [toggle, setToggle],
        tablesValue: [tables, setTables],
        fetchTablesValue: { fetchTables },
        tableValue: [table, setTable],
        menuValue: [menus, setMenus],
        fetchMenusValue: { fetchMenus },
        initialvaluefortable: initialFormState,
        cartValue: [cart, setCart],
        orderValue: [orders, setOrders],
        getOrderValue: [getOrder, setGetOrder],
        filteredOrdersValue: [filteredOrders, setFilteredOrders],
        fetchOrdersValue: { fetchOrders },
        singleOrderValue: [singleOrder, setSingleOrder],
        reportValue: [reports, setReports],
        filteredReportsValue: [filteredReports, setFilteredReports],
        fetchReportsValue: { fetchReports },
        singleReportValue: [singleReport, setSingleReport],
        detailValue: [details, setDetails],
        fetchDetailsValue: { fetchDetails },
        userValue: [userData, setUserData],
        userListValue: [userLists, setUserLists],
        fetchUserListsValue: { fetchUserLists },
        loggedinValue: [loggedinUser, setLoggedinUser],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
