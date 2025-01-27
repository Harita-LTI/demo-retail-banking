import { Button, Modal } from "react-bootstrap";

interface ConfirmModalProps {
  showModal: boolean;
  handleYes: () => void;
  handleNo: () => void;
  setShowModal: (showModal: boolean) => void;
  bodyMessage: string;
}

export default function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.bodyMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.handleYes()}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={() => props.handleNo()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
