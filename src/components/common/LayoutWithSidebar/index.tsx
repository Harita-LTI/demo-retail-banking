import { faN } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./index.css";
import LayoutContainer from "./LayoutContainer";
import Header from "./Header";

interface LayoutWithSidebarProps {
  children?: any;
  icon?: any;
  title?: string;
  btn?: any;
  //param:any
}
function LayoutWithSidebar(fn: LayoutWithSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <Header />
      <LayoutContainer fn={fn}/>
    </div>
  );
}

export default LayoutWithSidebar;
