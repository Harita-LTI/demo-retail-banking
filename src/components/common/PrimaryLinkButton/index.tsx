import React from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { NavLink } from "react-router";

interface PrimaryLinkButton {
  url: string;
  buttonText: string;
}

const PrimaryLinkButton: React.FC<PrimaryLinkButton> = ({
  url,
  buttonText,
}) => {
  return (
    <NavLink to={url} className="btn btn-primary btn-sm">
      {buttonText}
    </NavLink>
  );
};

export default PrimaryLinkButton;
