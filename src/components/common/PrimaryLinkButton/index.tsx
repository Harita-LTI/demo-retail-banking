import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

interface PrimaryLinkButton {
  url: string;
  buttonText: string;
}

const PrimaryLinkButton: React.FC<PrimaryLinkButton> = ({
  url,
  buttonText,
}) => {
  return (
    <Button variant="primary" href={url} size="sm">
      {buttonText}
    </Button>
  );
};

export default PrimaryLinkButton;
