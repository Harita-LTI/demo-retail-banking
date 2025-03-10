// SideMenu.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import {
  FaInbox,
  FaChartLine,
  FaBell,
  FaHome,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
//import { Divider } from '@mui/material';
import "../../index.css";

const SideMenuContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 95vh;
  position: relative;
`;

const MenuItemStyledComponent = styled(Link)`
  display: flex;
  position: relative;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#d0011b" : "#333")};
  background-color: ${(props) => (props.active ? "#f9ecee" : "transparent")};
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f4f4f4;
  }

  svg {
    margin-right: 10px;
  }
`;

const StickToBottom = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#d0011b" : "#333")};
  background-color: ${(props) => (props.active ? "#ebeef1" : "transparent")};
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ebeef1;
  }

  svg {
    margin-right: 10px;
  }
`;

function SideMenu() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
    { name: "Deposits", path: "/deposits", icon: <FaInbox /> },
    { name: "Withdraw", path: "/withdraw", icon: <FaBell /> },
    {
      name: "Transaction History",
      path: "/transaction-history",
      icon: <FaHome />,
    },
  ];
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClick = (name) => {
    setActiveItem(name);
  };

  useEffect(() => {
    let curLocation = window.location.pathname;
    let curTab = menuItems.find((c) => c.path === curLocation);

    if (curTab) setActiveItem(curTab.name);
  }, []);

  return (
    <SideMenuContainer>
      {menuItems.map((item) => (
        <MenuItemStyledComponent
          key={item.name}
          to={item.path}
          active={item.name === activeItem}
          onClick={() => handleMenuClick(item.name)}
        >
          {item.icon}
          {item.name}
        </MenuItemStyledComponent>
      ))}
      <div className="profileSection">
        {/* <Divider /> */}
        <StickToBottom
          to="/profile"
          active={"UserProfile" === activeItem}
          onClick={() => handleMenuClick("UserProfile")}
        >
          <FaUser /> Profile
        </StickToBottom>
        <StickToBottom
          to="/logout"
          active={"Logout" === activeItem}
          onClick={() => localStorage.removeItem("token")}
        >
          <FaSignOutAlt /> Logout{" "}
        </StickToBottom>
      </div>
    </SideMenuContainer>
  );
}

export default SideMenu;
