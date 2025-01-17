import { Row, Col, Card } from "react-bootstrap";
import SidebarMenu from "./SidebarMenu";
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
  return (
    <>
      <Row className="m-0 vh-100">
        <Col md={2} className="sidebar pt-4" style={{ background: "#1f6b6b" }}>
          <SidebarMenu />
        </Col>
        <Col md={10} className="p-4 bg-content">
          <Card className="rounded-0 border-0 card-shadow">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 text-darkgrey">
                <strong>
                  {fn.icon} <span className="ms-2">{fn.title}</span>
                </strong>
              </h5>
              {fn.btn ? fn.btn : null}
            </Card.Header>
            <Card.Body>
              <Card.Text>{fn.children}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default LayoutContainer;
