import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "jinxui";

function PrivateRoute({ component: Component, ...rest }) {
  const { userData } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        userData.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default PrivateRoute;
