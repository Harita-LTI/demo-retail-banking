import { faN } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "./index.css";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";
import LayoutFooter from "./Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getToken } from "../../../utils/token";
import { useValidateQuery } from "../../../services/authServices";
import { setCredentials } from "../../../features/auth/authSlice";
import { navigateUser } from "../../../utils/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

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
  const { data: userData, isLoading } = useValidateQuery(token, {
    skip: !token || user,
  });
  async function setUser(user: any, token: string) {
    await dispatch(setCredentials({ user, token }));
  }
  useEffect(() => {
    //@ts-ignore
    if (userData && token) {
      setUser(userData, token);
    }
  }, [userData]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <Header />
      <LayoutContainer fn={fn} />
      <LayoutFooter />
    </div>
  );
}

export default LayoutWithSidebar;
