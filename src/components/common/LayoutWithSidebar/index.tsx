import { faN } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "./index.css";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import LayoutFooter from "./Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getToken, removeToken } from "../../../utils/token";
import { useValidateQuery } from "../../../services/authServices";
import { logout, setCredentials } from "../../../features/auth/authSlice";
import { navigateUser } from "../../../utils/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SessionTimeout from "../SessionTimeout/SessionTimeout";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

interface LayoutWithSidebarProps {
  children?: any;
  icon?: any;
  title?: string;
  btn?: any;
  //param:any
}
function LayoutWithSidebar(fn: LayoutWithSidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      dispatch(logout());
      removeToken();
    });
    if (!token || !user || !user.role) {
      dispatch(logout());
      removeToken();
    }
  }, []);
  // const {
  //   data: userData,
  //   isLoading,
  //   error,
  // } = useValidateQuery(token, {
  //   skip: !token || user,
  // });
  // async function setUser(user: any, token: string) {
  //   await dispatch(setCredentials({ user, token }));
  // }
  // useEffect(() => {
  //   //@ts-ignore
  //   if (userData && token) {
  //     setUser(userData, token);
  //   }
  // }, [userData]);
  // if (error) {
  //   navigate("/login");
  // }
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  if (!token || !user || !user.role) {
    return <ProtectedRoute />;
  }
  return (
    <div>
      <SessionTimeout />
      <Header />
      <LayoutContainer fn={fn} />
      <LayoutFooter />
    </div>
  );
}

export default LayoutWithSidebar;
