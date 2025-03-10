import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
//import configureStore from "redux-mock-store";
import { logout } from "../../../features/auth/authSlice";
import { getToken, removeToken } from "../../../utils/token";
import SessionTimeout from "../SessionTimeout/SessionTimeout";
import Header from "./Header";
import LayoutContainer from "./LayoutContainer";
import LayoutFooter from "./Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { configureStore } from "@reduxjs/toolkit";
import LayoutWithSidebar from ".";

jest.mock("../../../utils/token");
jest.mock("../../../features/auth/authSlice");
jest.mock("../SessionTimeout/SessionTimeout");
jest.mock("./Header");
jest.mock("./LayoutContainer");
jest.mock("./Footer");
jest.mock("../ProtectedRoute/ProtectedRoute");

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    user: { role: "admin" },
  },
});

describe("LayoutWithSidebar", () => {
  beforeEach(() => {
    getToken.mockReturnValue("mockToken");
    SessionTimeout.mockReturnValue(<div>Session Timeout</div>);
    Header.mockReturnValue(<div>Header</div>);
    LayoutContainer.mockReturnValue(<div>Layout Container</div>);
    LayoutFooter.mockReturnValue(<div>Footer</div>);
    ProtectedRoute.mockReturnValue(<div>Protected Route</div>);
  });

  test("renders LayoutWithSidebar with all components", () => {
    render(
      <Provider store={store}>
        <Router>
          <LayoutWithSidebar />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Session Timeout/i)).toBeInTheDocument();
    expect(screen.getByText(/Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Layout Container/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });

  test("logs out and removes token on popstate event", () => {
    render(
      <Provider store={store}>
        <Router>
          <LayoutWithSidebar />
        </Router>
      </Provider>
    );

    fireEvent.popState(window);

    expect(logout).toHaveBeenCalled();
    expect(removeToken).toHaveBeenCalled();
  });

  test("renders ProtectedRoute if no token or user role", () => {
    getToken.mockReturnValue(null);
    render(
      <Provider store={store}>
        <Router>
          <LayoutWithSidebar />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(/Protected Route/i)).toBeInTheDocument();
  });
});
