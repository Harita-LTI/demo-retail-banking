import NavBar1 from "../Navbar1";
import NavBar2 from "../Navbar2";
import EngagementFooter from "../EngagementFooter";
import RegulatoryFooter from "../RegulatoryFooter";

interface GenericLayoutProps {
  children: any;
  //param:any
}
function GenericLayout(fn:GenericLayoutProps) {
  return (
    <>
      <div style={{ background: "#fff" }}>
        <div style={{ position: "fixed", top: "0", width: "100%" }}>
          <NavBar1 />
          <NavBar2 />
        </div>
        <div style={{ padding: "118px 20px 0" }}>
          {fn.children}
        </div>
        <EngagementFooter />
        <RegulatoryFooter />
      </div>
    </>
  )
}

export default GenericLayout;