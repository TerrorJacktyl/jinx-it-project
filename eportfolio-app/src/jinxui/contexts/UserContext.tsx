import React, { useState } from "react";
import { IUserContext } from "jinxui";

export const defaultUserContext: IUserContext = {
  username: "",
  firstName: "",
  token: "",
  authenticated: false,
  theme: "light",
  config: {},
};

// Define the context to hold a state object and its setState function.
// Type safety is enforced by the UserProvider wrapper
// Contexts demand a default value, which would mean putting a default both
// here *and* in the wrapper.
export const UserContext = React.createContext<[any, any]>([{}, () => { }]);

// Wrap components in this (rather than <UserContext.Provider>)
export const UserContextProvider = (props: any) => {
  const [state, setState] = useState<IUserContext>();

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
