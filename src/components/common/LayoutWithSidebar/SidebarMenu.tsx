// SideMenu.js
import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaUsers,
  FaPlusSquare,
  FaPeopleArrows,
  FaHome,
  FaMoneyBill,
} from "react-icons/fa";
import "./index.css";
import { Nav } from "react-bootstrap";

function SidebarMenu() {
  const [activeItem, setActiveItem] = useState("View Customers");
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const menuItems = [
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
    { name: "View Transactions",
      path: "/admin/withdraw",
      icon: <FaPeopleArrows /> 
    },
    {
      name: "Create New Account",
      path: "/admin/transaction-history",
      icon: <FaPlusSquare />,
    },
    {
      name: "Home",
      path: "/user/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Withdrawal",
      path: "/user/withdraw",
      icon: <FaMoneyBill />,
    },
    {
      name: "Deposit",
      path: "/user/deposit",
      icon: <FaMoneyBill />,
    },
    {
      name: "Transfer",
      path: "/user/transfer",
      icon: <FaMoneyBill />,
    },
  ];
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClick = (name: string) => {
    setActiveItem(name);
  };

  useEffect(() => {
    let curLocation = window.location.pathname;
    let curTab = menuItems.find((c) => c.path === curLocation);

    if (curTab) setActiveItem(curTab.name);
  }, []);

  return (
    <Nav defaultActiveKey="/home" className="flex-column mt-4">
      {menuItems.map((item) => (
        <Nav.Link
          className="text-white mb-2"
          key={item.name}
          href={item.path}
          active={item.name === activeItem}
          onClick={() => handleMenuClick(item.name)}
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
