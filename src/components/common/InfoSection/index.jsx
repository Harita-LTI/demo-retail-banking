import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

function InfoSection({param}) {

  return (
    <>
      <div className="InfoSection-main">
        <div><FontAwesomeIcon icon={faInfoCircle} /></div>
        <div className="info">
          {
            param.first ? <div className="para">
              {param.first}
            </div> : null
          }

          {
            param.second ? <div className="para">
              <p></p>
              {param.second}
              <p></p>
            </div> : null
          }
        </div>
        <div><FontAwesomeIcon icon={faTimes} /></div>
      </div>
    </>
  )
}

export default InfoSection;
