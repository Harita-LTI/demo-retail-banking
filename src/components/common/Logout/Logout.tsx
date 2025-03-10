import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { Link, NavLink, useNavigate } from "react-router";
import { text } from "@fortawesome/fontawesome-svg-core";
import { removeToken } from "../../../utils/token";
import { baseApi } from "../../../services/baseApi";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    removeToken();
    dispatch(baseApi.util.resetApiState());
    navigate("/login");
  };

  return (
    <NavLink to="#" onClick={handleLogout} className={"text-decoration-none"}>
      Logout
    </NavLink>
  );
};

export default Logout;
