// SideMenu.js
import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaUsers,
  FaHome,
  FaListOl,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaPiggyBank,
  FaBriefcase,
} from "react-icons/fa";
import "./index.css";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { NavLink, useNavigate } from "react-router";

function SidebarMenu() {
  const [activeItem, setActiveItem] = useState("View Customers");
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  let menuItems: any = [];
  const adminMenuItems = [
    {
      name: "View Customers",
      path: "/admin/customers",
      icon: <FaUsers />,
    },
    {
      name: "Create Customer",
      path: "/admin/create-customer",
      icon: <FaPlus />,
    },
    // {
    //   name: "View Transactions",
    //   path: "/admin/withdraw",
    //   icon: <FaPeopleArrows />,
    // },
    // {
    //   name: "Create New Account",
    //   path: "/admin/transaction-history",
    //   icon: <FaPlusSquare />,
    // },
  ];
  const userMenuItems = [
    {
      name: "Home",
      path: "/user/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Accounts",
      path: "/user/accounts",
      icon: <FaBriefcase />,
    },
    {
      name: "Withdraw",
      path: "/user/withdraw",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Deposit",
      path: "/user/deposit",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Money Transfer",
      path: "/user/transfer",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Quick Pay",
      path: "/user/quick-pay",
      icon: <FaPiggyBank />,
    },
    {
      name: "Statement",
      path: "/user/statement",
      icon: <FaListOl />,
    },
  ];
  if (
    user?.role &&
    (user.role === "BF_ADMIN" || user.role === "BF_CORPORATOR")
  ) {
    menuItems = [...menuItems, ...adminMenuItems];
  } else if (user?.role && user?.role === "BF_CUSTOMER") {
    menuItems = [...menuItems, ...userMenuItems];
  }
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClick = (name: string) => {
    setActiveItem(name);
  };

  useEffect(() => {
    let curLocation = window.location.pathname;
    let curTab = menuItems.find((c: any) => c.path === curLocation);

    if (curTab) setActiveItem(curTab.name);
  }, []);

  return (
    <Nav defaultActiveKey="/home" className="flex-column mt-4">
      {menuItems?.map((item: any) => (
        <Nav.Link
          className="text-white mb-2"
          key={item.name}
          to={item.path}
          active={item.name === activeItem}
          onClick={() => handleMenuClick(item.name)}
          as={NavLink}
        >
          {item.icon}
          <span className="ms-2">
            <small>{item.name}</small>
          </span>
        </Nav.Link>
      ))}
    </Nav>
  );
}

export default SidebarMenu;
