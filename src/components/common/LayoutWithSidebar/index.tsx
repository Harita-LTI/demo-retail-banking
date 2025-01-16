// import NavBar1 from "../Navbar1";
// import NavBar2 from "../Navbar2";
// import EngagementFooter from "../EngagementFooter";
// import RegulatoryFooter from "../RegulatoryFooter";
// import styled from "styled-components";
// import SideMenu from "../../dashboard/SideMenu";

// interface LayoutWithSidebarProps {
//   children: any;
//   //param:any
// }
// const LayoutContainer = styled.div`
//   display: flex;
//   margin-top: 5.8em;
// `;

// const LayoutContent = styled.div`
//   flex: 1;
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   background-color: #f4f5f7;
// `;

// const MainContent = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const RightSidebar = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;
// function LayoutWithSidebar(fn: LayoutWithSidebarProps) {
//   return (
//     <>
//       <div style={{ position: "fixed", top: "0", zIndex: "3" }}></div>
//       <LayoutContainer>
//         <SideMenu />
//         <LayoutContent>
//           <MainContent>{fn.children}</MainContent>
//           <RightSidebar>
//             {/* <QuickTransfers /> */}
//             {/* <Cards /> */}
//           </RightSidebar>
//         </LayoutContent>
//       </LayoutContainer>
//       <RegulatoryFooter />
//     </>
//   );
// }

// export default LayoutWithSidebar;

import { faN } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Table,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaCircle, FaUser } from "react-icons/fa";
import NavbarSupport from "../NavbarSupport";
import "./index.css";
import SidebarMenu from "./SidebarMenu";
import EngagementFooter from "../EngagementFooter";
import RegulatoryFooter from "../RegulatoryFooter";

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
      <Row className="m-0 vh-100">
        <Col md={2} className="sidebar pt-4" style={{ background: "#00a3a3" }} >
          <SidebarMenu />
        </Col>
        <Col md={10} className="p-4 bg-content">
          <Card className="rounded-0 border-0 card-shadow">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 text-darkgrey">
                <strong>
                  {fn.icon} <span className="ms-2">{fn.title}</span>
                </strong>
              </h5>
              {fn.btn ? fn.btn : null}
            </Card.Header>
            <Card.Body>
              <Card.Text>{fn.children}</Card.Text>
            </Card.Body>
          </Card>
          {/* <div className="p-4">
            <h2>Heading Bar</h2>
          </div> */}
        </Col>
      </Row>
    </div>
  );
}

const Header = () => {
  return (
    <>
      <NavbarSupport />
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Navbar.Brand href="http://localhost:3000/">
          <img
            className="bank-full-logo"
            src={
              process.env.PUBLIC_URL + "/assets/images/unity_bank_full_logo_vertical.png"
            }
            alt="bank_logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end profile-nav"
        >
          <Nav className="height-50">
            <Dropdown align={"end"}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="rounded-circle height-50"
              >
                <FaUser />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/1">
                  <b className="text-secondary">
                    <small>Logged In As: </small>
                  </b>
                  <br />
                  John Doe
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default LayoutWithSidebar;
