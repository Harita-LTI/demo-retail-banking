import { NavLink } from "react-router";

const PageNotFound = () => {
  return (
    <>
      <div className="">
        <div className="d-flex align-items-center justify-content-center min-vh-100 px-2">
          <div className="text-center">
            <h1 className="display-1 fw-bold text-primary">
              <span>404</span>
            </h1>
            <p className="fs-2 fw-medium mt-4">Oops! Page not found</p>
            <p className="mt-4 mb-5">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <NavLink
              to="/"
              className="btn btn-light fw-semibold rounded-none px-4 py-2"
            >
              Go Home
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
