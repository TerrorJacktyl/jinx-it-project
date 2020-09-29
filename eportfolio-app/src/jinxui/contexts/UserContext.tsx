import React, { useState } from "react";
import { IUserContext } from "jinxui";

const USER_DATA_KEY = "userData";

export const defaultUserContext: IUserContext = {
  username: "",
  token: "",
  authenticated: false,
  theme: "light",
  config: {},
};

// Define the context to hold a state object and its setState function.
// Type safety is enforced by the UserProvider wrapper
// Contexts demand a default value, which would mean putting a default both
// here *and* in the wrapper.
export const UserContext = React.createContext<[IUserContext, any, any]>([defaultUserContext, () => { }, () => { }]);

/**
 * Save a copy of the user data in the browser's storage.
 * @param userData new copy of userData to save - ideally the latest context state
 */
export function storeUserData(userData: IUserContext) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

/**
 * Attempt to get user data stored in local browser storage.
 * Return null if not found.
 */
export function retrieveUserData(): (IUserContext | null) {
  const storedString = localStorage.getItem(USER_DATA_KEY);
  return storedString ? JSON.parse(storedString) : null;
}

// Wrap components in this (rather than <UserContext.Provider>)
export const UserContextProvider = (props: any) => {

  // Retrieve stored user data
  const localData = retrieveUserData();

  const [state, setState] = useState<IUserContext>(
    localData ? localData : defaultUserContext
  );

  /**
   * Wrapper function for updating both the context state and saving the new state in local storage.
   * @param fieldsToUpdate the same partial IUserContext you'd pass to setState
   */
  const updateState = (fieldsToUpdate: Partial<IUserContext>) => {
    const newState = { ...state, ...fieldsToUpdate };
    storeUserData(newState);
    setState(newState);
    return;
  }

  /**
   * Reset context state to defaultUserContext, and clear browser stored user data.
   */
  const resetState = () => {
    setState(defaultUserContext);
    localStorage.clear();
  }

  return (
    <UserContext.Provider value={[state, updateState, resetState]}>
      {props.children}
    </UserContext.Provider>
  );
};
