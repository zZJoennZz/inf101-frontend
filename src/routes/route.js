import { Navigate } from "react-router-dom";

export function publicRoute(isAuth, component) {
  if (!isAuth) {
    return component;
  } else {
    return <Navigate to="/home" />;
  }
}

export function privateRoute(isAuth, component) {
  if (isAuth) {
    return component;
  } else {
    return <Navigate to="/" />;
  }
}
