import { Button, Modal } from "react-bootstrap";

interface PlaneModalForNotificationProps {
  showModal:boolean
  setShowModal: (showModal: boolean) => void
  title:string
  bodyMessage:string
}

export default function PlaneModalForNotification(props:PlaneModalForNotificationProps) {
  return (
    <Modal
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
      backdrop={true}
      keyboard={true}
      >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.bodyMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
