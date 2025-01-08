import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

function LinkCatelog({param}) {
  return(
    <>
      {
        param ? <div className="catelog-main-container">
          {
            param.map((infoObj,i) => {
              return <div className="info-tile" key={i}>
                <div className="catelog-title">{infoObj.title}</div>
                <FontAwesomeIcon className="info-arrow" icon={faAngleRight} />
              </div>
            })
          }
        </div> : null
      }
    </>
  )
}

export default LinkCatelog;