import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

interface ImgTileCatelogProps {
  param: any;
}

function ImgTileCatelog(fn:ImgTileCatelogProps) {
  return (
    <>
      {fn.param ? (
        <div className="imgcatelog-main-container">
          {fn.param.map((infoObj:any, i:number) => {
            return (
              <div className="img-info-tile" key={i}>
                <img
                  className="img-container"
                  src={
                    process.env.PUBLIC_URL + "assets/images/" + infoObj.imgLink
                  }
                  alt=""
                />
                <div className="info-container">
                  <div className="title-section">
                    <div className="imgcatelog-title">{infoObj.title}</div>
                    <FontAwesomeIcon
                      className="info-arrow"
                      icon={faAngleRight}
                    />
                  </div>
                  {infoObj.desc1 ? (
                    <div className="desc-section">
                      <p></p>
                      {infoObj.desc1}
                    </div>
                  ) : null}
                  {infoObj.desc2 ? (
                    <div className="desc-section">
                      <p></p>
                      {infoObj.desc2}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default ImgTileCatelog;
