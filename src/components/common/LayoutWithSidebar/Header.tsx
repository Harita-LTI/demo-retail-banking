import NavbarSupport from "../NavbarSupport";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaCircle, FaUser } from "react-icons/fa";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
const Header = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <NavbarSupport />
      <Navbar bg="white" variant="light" expand="lg" className="shadow-sm">
        <Navbar.Brand href="http://localhost:3000/">
          <img
            className="bank-full-logo"
            src={
              process.env.PUBLIC_URL +
              "/assets/images/unity_bank_full_logo_vertical.png"
            }
            alt="bank_logo"
          />
        </Navbar.Brand>
        {token && (
          <>
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
                    aria-label="login user button"
                    className="rounded-circle height-50"
                  >
                    <FaUser />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#action/1">
                      <span className="text-primary">
                        <small>Logged In As: </small>
                      </span>
                      <br />
                      {user?.mailId ? user?.mailId : "--"}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.ItemText className="text-primary">
                      <Logout />
                    </Dropdown.ItemText>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};
export default Header;
