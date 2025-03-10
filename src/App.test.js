import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import App from "./App";
//import Home from "./Home";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/HomePage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import PageNotFound from "./components/common/PageNotFound";

describe("App", () => {
  test("renders Home component for default route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders Error component for bad route", () => {
    render(
      <MemoryRouter initialEntries={["/abc"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByTestId("page-not-found")).toBeInTheDocument();
  });

  test("renders Login component for /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Provider store={store}>
                <LoginPage />
              </Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Please enter your password/i)).toBeInTheDocument();
  });
});
