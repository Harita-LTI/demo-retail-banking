import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faInfo, faMapMarker, faPhone, faGlobe, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function EngagementFooter() {
  return(
    <> 
    <div className="engagementFooter-main">
      <div className="child-section">
        <FontAwesomeIcon className="footer-icon" icon={faPhone} />
        <div className="info-section">
          <div>Contact HSBC</div>
          <div style={{"width": "70%"}}>
            Enquire online, call or send a message
             <span><FontAwesomeIcon className="right-icon" icon={faAngleRight} /></span>
          </div>
        </div>
      </div>

      <div className="child-section">
        <FontAwesomeIcon className="footer-icon" icon={faMapMarker} />
        <div className="info-section">
          <div>Find a branch or ATM</div>
          <div style={{"width": "70%"}}>
            Find your nearest HSBC branch or ATM
            <span><FontAwesomeIcon className="right-icon" icon={faAngleRight} /></span>
          </div>
        </div>
      </div>

      <div className="child-section">
        <FontAwesomeIcon className="footer-icon" icon={faInfo} />
        <div className="info-section">
          <div>Frequently Asked Questions</div>
          <div style={{"width": "70%"}}>
            See the FAQs on our products
            <span><FontAwesomeIcon className="right-icon" icon={faAngleRight} /></span>
          </div>
        </div>
      </div>

      <div className="child-section">
        <FontAwesomeIcon className="footer-icon" icon={faGlobe} />
        <div className="info-section">
          <div>About HSBC</div>
          <div style={{"width": "70%"}}>
            Careers, media, investor and corporate information
            <span><FontAwesomeIcon className="right-icon" icon={faAngleRight} /></span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EngagementFooter;