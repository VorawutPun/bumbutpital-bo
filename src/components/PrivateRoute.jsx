import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const condition = localStorage.getItem("token");

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default PrivateRoute;
