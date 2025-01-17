import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function LayoutFooter() {
  return (
    <>
      <div className="footer-main">
        <div className="links-side">
        <div>© The Unity Banking Corporation Limited, India (UNITY India). Incorporated in Hong Kong SAR with limited liability.</div>
          <div>All rights reserved.</div>
        </div>

        {/* <div className="contact-side">
          <div>Contact</div>
          <div><FontAwesomeIcon icon={faPhone} />
                      <span
                        style={{
                          cursor: "pointer",
                          paddingLeft: "5px",
                        }}
                      >
                        1800-0000-000
                      </span></div>
          <div>            <FontAwesomeIcon icon={faEnvelope} />
                      support@unity.com</div>
        </div> */}
      </div>
    </>
  )
}

export default LayoutFooter;