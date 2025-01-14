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
      <div className="ns-main">
        <div className="ns-child">
          <div className="ns-option">For Support: </div>
          <div className="ns-option"></div>
          <div className="ns-option">
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
          <div className="ns-option login-button" onClick={onLogin}>
            <FontAwesomeIcon icon={faEnvelope} />
            support@unity.com
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarSupport;
