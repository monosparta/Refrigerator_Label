import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/LoginPage";
import Management from "./Pages/ManagementPage";
import NoFoundPage from "./Pages/NotFoundPage";
import Register from "./Pages/RegisterPage";
import Admins from "./Pages/AdminListPage";
import { I18nextProvider } from "react-i18next";
import i18n from './i18n';

export const TokenContext = React.createContext(null);

export default function App() {
  const [tokenContext, setTokenContext] = React.useState(
    localStorage.getItem("login_token")
  );

  return (
    <TokenContext.Provider value={{ tokenContext, setTokenContext }}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !tokenContext ? (
                  <Login />
                ) : (
                  <Navigate to="/ManagementPage" replace />
                )
              }
            />
            <Route
              path="/ManagementPage"
              element={
                !tokenContext ? <Navigate to="/" replace /> : <Management />
              }
            />
            <Route
              path="/Register"
              element={
                !tokenContext ? <Navigate to="/" replace /> : <Register />
              }
            />
            <Route
              path="/Admins"
              element={!tokenContext ? <Navigate to="/" replace /> : <Admins />}
            />
            <Route path="*" element={<NoFoundPage />} />
          </Routes>
        </Router>
      </I18nextProvider>
    </TokenContext.Provider>
  );
}
