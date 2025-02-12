import { FaUser } from "react-icons/fa";
import "./index.css";

const CustomerImage = ({ src, gender }: any) => {
  const famaleImgSrc =
    process.env.PUBLIC_URL + "/assets/images/user-female.svg";
  const maleImgSrc = process.env.PUBLIC_URL + "/assets/images/user-male.svg";
  const avatarImgSrc =
    process.env.PUBLIC_URL + "/assets/images/user-avatar.svg";
  return (
    <div className="customer-image">
      {src && <img src={src} alt="Customer" />}
      {!src && gender === "FEMALE" ? (
        <img src={famaleImgSrc} alt="Customer" />
      ) : !src && gender === "MALE" ? (
        <img src={maleImgSrc} alt="Customer" />
      ) : (
        <span>
          <img src={avatarImgSrc} alt="Customer" />
        </span>
      )}
    </div>
  );
};

export default CustomerImage;
