import LinkCatelog from "../components/common/LinkCatelog";
import InfoSection from "../components/common/InfoSection";
import NavBar1 from "../components/common/Navbar1";
import NavBar2 from "../components/common/Navbar2";
import HomeHeader from "../components/HomeHeader";
import ImgTileCatelog from "../components/common/ImgTileCatelog";
import RenderTitleWithLeftBorder from "../components/common/RenderTitleWithLeftBorder";
import TableShow from "../components/common/TableShow";
import RegulatoryFooter from "../components/common/RegulatoryFooter";
import EngagementFooter from "../components/common/EngagementFooter";
import SocialConnect from "../components/common/SocialConnect";
import ImgInfoSection from "../components/common/ImgInfoSection";

function Home() {
  const infoBox = {
    first: `We are now on WhatsApp! Say Hi on +91 86558 58111 to start your conversation. Access and receive information on the latest offers on HSBC products and services through WhatsApp. Learn more`,
    second: `IMPORTANT : Make a payment towards your HSBC credit card account via National Electronic Fund Transfer (NEFT), mentioning the complete 16-digit HSBC credit card number and the IFSC code HSBC0400002.`,
  };

  const CatelogInfo = [
    { title: "Premier Banking", link: "" },
    { title: "NRI Services", link: "" },
    { title: "Credit Cards", link: "" },
    { title: "Employee Banking Solution", link: "" },
    { title: "Home Loans", link: "" },
    { title: "Personla Loans", link: "" },
    { title: "Investment", link: "" },
    { title: "Insurance", link: "" },
  ];

  const ImgBasedCatelogInfo = [
    {
      title: "HSBC India Mobile Banking app",
      imgLink: "ind_mob_app.png",
      desc1: "Conveniently manage your HSBC accounts anytime, anywhere.",
      desc2: "",
      desc3: "",
    },
    {
      title: "Fixed Deposit Account",
      imgLink: "fd.png",
      desc1: "Get interest rates up to 7.50% p.a.",
      desc2: "T&Cs apply.",
      desc3: "",
    },
    {
      title: "Wealth Insights",
      imgLink: "wealth_insight.png",
      desc1:
        "Get the latest in-house perspectives on financial markets and various asset classes.",
      desc2: "",
      desc3: "",
    },
    {
      title: "Claim funds from your in-operative HSBC account",
      imgLink: "claim_funds.png",
      desc1:
        " Learn how you can withdraw funds from your inoperative HSBC account with ease!",
      desc2: "",
      desc3: "",
    },
    {
      title: "HSBC Customer Studio",
      imgLink: "cutomer_studio.png",
      desc1:
        "Join our online community, share your ideas and help us improve our product and services.",
      desc2: "",
      desc3: "",
    },
    {
      title: "Safeguard",
      imgLink: "safeguards.png",
      desc1:
        "HSBC Safeguard is a series of related initiatives to better protect our customers from fraud and financial crime.",
      desc2: "",
      desc3: "",
    },
  ];

  const TableInfo = [
    {
      first: "Policies & regulatory information",
      second: "Important documents",
    },
    {
      first: "SEBI ODR circular (PDF, 856KB)",
      second: "Reserve bank – Financial Fraud Awareness (JPG, 207KB)",
    },
    {
      first: "SEBI ODR loginSEBI",
      second: "Reserve Bank - Integrated Ombudsman Scheme (PDF, 1.37MB)",
    },
    {
      first: "Important notification with respect to Form 10 F",
      second: "NSDL circular advisory (KYC compliance) (PDF, 209KB)",
    },
    {
      first: "Important income tax requirement - linking PAN to Aadhaar",
      second: "HSBC India Customer Rights Policy (PDF, 258KB)",
    },
    {
      first: "Feedback & Complaints",
      second: "HSBC Bank IFSC Codes, MICR Codes and BSR Codes (PDF, 57KB)",
    },
    {
      first: "Common Reporting Standard (CRS)",
      second: "HSBC Citizens Charter (PDF, 92KB)",
    },
    {
      first: "Regulatory & Banking Practices",
      second:
        "Banking Facility for Senior Citizens and Differently Abled Persons (PDF, 89KB)",
    },
    {
      first: "Interest Rates & Service Charges",
      second:
        "The Depositor Education and Awareness Fund (DEA Fund) Claim Procedure (PDF, 46KB)",
    },
    { first: "Foreign Account Tax Compliance Act (FATCA)" },
    { first: "Do Not Call Service" },
    { first: "Important Notices" },
    { first: "Foreign Exchange Management Act (FEMA) FAQs" },
    { first: "TCS (Tax Collected at source) (PDF, 89KB)" },
    { first: "UDGAM Link" },
    { first: "SEBI Investor Website" },
  ];

  return (
    <>
      <div style={{ background: "#fff" }}>
        <div style={{ position: "fixed", top: "0", width: "100%" }}>
          <NavBar1 />
          <NavBar2 />
        </div>
        <div style={{ padding: "118px 20px 0" }}>
          <HomeHeader />
          <InfoSection param={infoBox} />
          <LinkCatelog param={CatelogInfo} />
          <ImgTileCatelog param={ImgBasedCatelogInfo} />
          <RenderTitleWithLeftBorder param={{ title: "Useful Links" }} />
          <TableShow param={TableInfo} />
          <ImgInfoSection />
          <SocialConnect />
        </div>
        <EngagementFooter />
        <RegulatoryFooter />
      </div>
    </>
  );
}

export default Home;
