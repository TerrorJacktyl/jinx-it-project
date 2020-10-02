import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "jinxui";

/** Wrapper for routes only accessible by logged in users.
 * Redirects users to login if they try to access this route without being
 * logged in.
 */
export function LoggedInRoute({ component: Component, ...rest }) {
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

/** Wrapper for routes only accessible by logged *out* users.
 * Redirects users to home if they try to access this route *while* being
 * logged in.
 */
export function LoggedOutRoute({ component: Component, ...rest }) {
  const { userData } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        !userData.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/profile" />
        )
      }
    />
  );
}
