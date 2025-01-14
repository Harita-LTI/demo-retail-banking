import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

function HomeHeader() {
  return (
    <>
      <div className="homeHeader-main">
        <div className="homeHeader-child">
          <img
            className="homeHeader-img"
            src={process.env.PUBLIC_URL + "assets/images/bank_interior_header_img.jpg"}
            alt="hsbc_header_img"
          />
        </div>
        <div className="homeHeader-child">
          <div className="homeHeader-service-tab">
            <div className="homeHeader-sevice-tab-title">
              UNITY Live+ Credit Card{" "}
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>
            <div>
              Get 4 complimentary domestic airport lounge visit per year.
            </div>
          </div>
          <div className="homeHeader-service-tab">
            <div className="homeHeader-sevice-tab-title letter-spacing">
              Open NRI account{" "}
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>
            <div>Open an NRI account in just 4 hours. T&C apply.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHeader;
