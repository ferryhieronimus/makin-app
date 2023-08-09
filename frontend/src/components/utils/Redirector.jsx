import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const isLoggedIn = Cookies.get("loggedUser");

const ProtectedLogin = ({ children }) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }
  return children;
};

const RedirectToHome = ({ children }) => {
  if (isLoggedIn) {
    return <Navigate to='/' />;
  }
  return children;
};

export { ProtectedLogin, RedirectToHome };
