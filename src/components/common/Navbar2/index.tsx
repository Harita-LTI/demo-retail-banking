import { useNavigate } from "react-router";

import "./index.css";

function NavBar2() {
  let navigate = useNavigate();

  return (
    <>
      <div className="navbar2-main">
        <div className="pointer"></div>
        <div className="logo-container" onClick={() => navigate("/")}>
          <img
            className="bank-full-logo"
            src={
              process.env.PUBLIC_URL +
              "/assets/images/unity_bank_full_logo_vertical.png"
            }
            alt="bank_logo"
          />
        </div>
        <div className="feature-container">
          <div className="navbar2-option navbar2-right-separator">
            <div>Banking</div>
            <div className="preview-desc">Cards & Account</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Borrowing</div>
            <div className="preview-desc">Home & Personal Loans</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Investing</div>
            <div className="preview-desc">Wealth & Insurance</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>NRI</div>
            <div className="preview-desc">NRI services & Transfer</div>
          </div>
          <div className="navbar2-option navbar2-right-separator">
            <div>Offers</div>
            <div className="preview-desc">Offers & Rewards</div>
          </div>
          <div className="navbar2-option">
            <div>Online Banking</div>
            <div className="preview-desc">Banking made easy</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar2;
