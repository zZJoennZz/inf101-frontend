import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Assigning route to public
 *
 * @param {boolean}          isAuth      Status of authentication.
 * @param {React.Component}  component   The component that will be rendered if isAuth is true.
 *
 * @return {React.Component} The component the user will see.
 */
export function publicRoute(isAuth, component) {
  if (!isAuth) {
    return component;
  } else {
    return <Navigate to="/home" />;
  }
}

/**
 * Assigning route to private
 *
 * @param {boolean}          isAuth      Status of authentication.
 * @param {React.Component}  component   The component that will be rendered if isAuth is true.
 *
 * @return {React.Component} The component the user will see.
 */
export function privateRoute(isAuth, component) {
  if (isAuth) {
    return component;
  } else {
    return <Navigate to="/" />;
  }
}
