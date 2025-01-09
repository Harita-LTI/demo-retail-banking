import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

interface LinkCatelogProps {
  param: any;
}

function LinkCatelog(fn:LinkCatelogProps ) {
  return(
    <>
      {
        fn.param ? <div className="catelog-main-container">
          {
            fn.param.map((infoObj:any,i:number) => {
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