import React, { useState } from "react";
import LayoutWithSidebar from "../../components/common/LayoutWithSidebar";
import { FaUsers } from "react-icons/fa";
import PrimaryLinkButton from "../../components/common/PrimaryLinkButton";

const Dashboard = () => {

  return(
    <>
    <h1> Hello </h1>
    </>
  )
}

function DashboardPage() {
  return (
    <LayoutWithSidebar
      icon={<FaUsers />}
      title={"Customers"}
      btn={
        <PrimaryLinkButton
          buttonText="Add New Customer"
          url="/admin/create-customer"
        />
      }
    >
      <Dashboard />
    </LayoutWithSidebar>
  );
}
export default DashboardPage;