import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

interface InfoSectionProps {
  param: any;
}

function InfoSection(fn:InfoSectionProps ) {

  return (
    <>
      <div className="InfoSection-main">
        <div><FontAwesomeIcon icon={faInfoCircle} /></div>
        <div className="info">
          {
            fn.param.first ? <div className="para">
              {fn.param.first}
            </div> : null
          }

          {
            fn.param.second ? <div className="para">
              <p></p>
              {fn.param.second}
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
