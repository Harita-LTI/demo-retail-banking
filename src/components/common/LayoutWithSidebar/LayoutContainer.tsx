import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";

import SidebarMenu from "./SidebarMenu";
import "./index.css";
import { RootState } from "../../../store/store";
import { generateCustomerId } from "../../../utils/utility";

interface LayoutWithSidebarProps {
  children?: any;
  icon?: any;
  title?: string;
  btn?: any;
  //param:any
}
interface LayoutContainerProps {
  fn: LayoutWithSidebarProps;
}
const LayoutContainer: React.FC<LayoutContainerProps> = ({ fn }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  let title = fn.title;
  
  if(window.location.pathname === "/user/dashboard" && user)
    title = title + ", " + user.first_Name + " " + user.last_name + ` (${generateCustomerId(user.userId)})`;

  return (
    <>
      <Row className="m-0 content-height">
        <Col md={2} className="sidebar pt-4" style={{ background: "#1f6b6b" }}>
          <SidebarMenu />
        </Col>
        <Col md={10} className="p-4 bg-content">
          <Card className="rounded-0 border-0 card-shadow">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 text-primary">
                <strong>
                  {fn.icon} <span className="ms-2">{title}</span>
                </strong>
              </h5>
              {fn.btn ? fn.btn : null}
            </Card.Header>
            <Card.Body>{fn.children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default LayoutContainer;
