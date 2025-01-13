import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEnvelope,
  faPhone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./index.css";

function NavbarSupport() {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="main">
        <div className="child">
          <div className="option">For Support: </div>
          <div className="option"></div>
          <div className="option">
            <FontAwesomeIcon icon={faPhone} />
            <span
              onClick={handleRegisterClick}
              style={{
                cursor: "pointer",
                paddingLeft: "5px",
              }}
            >
              1800-0000-000
            </span>
          </div>
          <div className="option login-button" onClick={onLogin}>
            <FontAwesomeIcon icon={faEnvelope} />
            support@hsbc.com
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarSupport;
