import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faAngleRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function ImgInfoSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="ImgInfo-main">
        <div className="imgInfo-section">
          <div className="imgInfo-img-section">
            <img
              src={process.env.PUBLIC_URL + "assets/images/imgInfo1.png"}
              alt=""
            />
          </div>
          <div className="imgInfo-info-section">
            <div>Think you've been a victim of fraud?</div>
            <div>
              Report any online fraud straight away, and keep up to date with
              the latest fraud help and advice:{" "}
            </div>
            <ul>
              <li>Call 1930 for online financial fraud</li>
              <li>Visit www.cybercrime.gov.in to report any cybercrime</li>
              <li>
                Follow CYBERDOST on social media for updates on cyber hygiene
              </li>
            </ul>
            <div>
              Supported by the Ministry of Home Affairs and the Indian Cyber
              Crime Coordination Centre.
            </div>
          </div>
        </div>

        <div className="imgInfo-section">
          <div className="imgInfo-img-section-2">
            <img
              src={process.env.PUBLIC_URL + "assets/images/imgInfo2.png"}
              alt=""
            />
          </div>
          <div className="imgInfo-info-section">
            <div>We're registered with the DICGC</div>
            <div>
              The Hongkong and Shanghai Banking Corporation Limited, India (HSBC
              India) is registered with the Deposit Insurance and Credit
              Guarantee Corporation (DICGC).
            </div>
            <div>
              Bank deposits up to INR500,000 per depositor are fully insured by
              the DICGC under the Deposit Insurance Scheme. Please visit the
              DICGC website for more information.
            </div>
            <div className="highlight">
              DICGC website{" "}
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          1Special rate of 9.99% is applicable for personal loans given to
          employees of select businesses. T&Cs apply
        </div>
        <div className="bottom-section" onClick={scrollToTop}>
          <span className="underline">Back to top</span>{" "}
          <span>
            <FontAwesomeIcon icon={faArrowUp} />
          </span>
        </div>
      </div>
    </>
  );
}

export default ImgInfoSection;
