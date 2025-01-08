import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

function ImgTileCatelog({ param }) {
  return (
    <>
      {param ? (
        <div className="imgcatelog-main-container">
          {param.map((infoObj, i) => {
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
