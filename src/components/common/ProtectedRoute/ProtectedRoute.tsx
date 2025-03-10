import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { RootState } from "../../../store/store";
import { getToken } from "../../../utils/token";

const ProtectedRoute = () => {
  const token = getToken(); //useSelector((state: RootState) => state.auth);

  // show unauthorized screen if no user is found in redux store
  if (!token) {
    return (
      <div className="" data-testid="protected-route">
        <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
          <div className="text-center">
            <h1 className="display-1 fw-bold text-primary">
              <span>401</span>
            </h1>
            <p className="fs-2 fw-medium mt-4">Unauthorized!!!</p>
            <p className="mt-4 mb-5">
              You are not authorized to view this page. Please click below to
              login.
            </p>
            <NavLink
              to="/login"
              className="btn btn-light fw-semibold rounded-none px-4 py-2"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
