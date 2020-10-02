import { useContext } from "react";
import { UserContext } from "jinxui";
import API from "../../API";
import { AxiosRequestConfig } from "axios";

/**
 * The 'user' hook
 * 
 * Abstracts all API calls and management of user data (both in React components
 * and the browser's local storage) away from other components.
 * 
 * When writing a function for the user hook, please keep in mind:
 * 1. The success (return) of your function shouldn't include anything axios or HTTP related
 * 2. The failure (throw) of your function should be an error message, probably extracted from 
 *    the HTTP response. Please do not leave it to other components to extract the error message.
 */
export const useUser = () => {
  const [state, updateState, resetState] = useContext(UserContext);

  const LOGIN_PATH = "auth/token/login";
  const LOGOUT_PATH = "auth/token/logout";
  const ACCOUNT_PATH = "api/accounts/me";
  const SIGNUP_PATH = "auth/users";

  /**
   * Abstract the login procedure. Returns the auth_token if login succeeded,
   * or the backend response if it failed.
   * @param username
   * @param password
   */
  async function login(username: string, password: string) {
    try {
      const response = await API.post(LOGIN_PATH, {
        username: username,
        password: password,
      });
      if ("auth_token" in response.data) {
        // Set auth header to authenticate future requests
        const config = {
          headers: {
            Authorization: "Token " + response.data.auth_token,
          },
        };

        const accDetails = await getAccountDetails(config);
        console.log(accDetails?.data.first_name);
        // Update internal state about user
        // Do not return until internal state has been updated
        const stateChanges = {
          username: username,
          firstName: accDetails?.data.first_name,
          token: response.data["auth_token"],
          authenticated: true,
          config: config,
        }
        // Update context (react) state and local (browser) state
        await updateState(stateChanges);
        return config;
      }
    } catch (e) {
      throw handleError(e);
    }
  }

  // Another style: await with try catch
  async function logout() {
    /**
     * Reset context state to default, and clear browser-stored user data.
     * Do this before the POST in case already logged out (failing POST would prevent
     * reseting browser state).
     */
    resetState();
    try {
      const response = await API.post(LOGOUT_PATH, {}, state.config);

      // Logout succeeded on backend
      if (response.status === 204) {
        return response;
      }
      // Logout failed on backend - the browser's token might have already expired
    } catch (e) {
      throw e.message;
    }
  }

  // Declaring a function as async means the return gets wrapped in a promise
  /** Complete these tasks:
   * 1. Sign up the user in the backend.
   * 2. Log the user in automatically.
   */
  async function signup(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const response = await API.post(SIGNUP_PATH, {
        username: username,
        password: password,
        email: email,
      });
      const config = await login(username, password);
      await setAccountDetails(firstName, lastName, config);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async function getAccountDetails(konfig: AxiosRequestConfig = state.config) {
    try {
      const response = await API.get(ACCOUNT_PATH, konfig)
      if ("first_name" in response.data) {
        return response;
      }
    } catch (error) {
      throw error;
    };
  }

  /**
   * Update the logged in user's account details.
   * @param first_name
   * @param last_name
   * @param konfig ignore this, you don't need this argument - only used for sign up trickery
   */
  async function setAccountDetails(
    first_name?: string,
    last_name?: string,
    konfig: AxiosRequestConfig = state.config
  ) {
    API.put(
      ACCOUNT_PATH,
      {
        first_name: first_name,
        last_name: last_name,
      },
      konfig
    )
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Extract the error message from various hook functions.
   * If we come up with a standard error response format, this function will become much smaller.
   * @param error 
   */
  const handleError = (e: { response: any }) => {
    const error = e.response;
    var errorVar = null;
    var submitError = "";
    if (error.data) {
      if (error.data.non_field_errors) {
        errorVar = error.data.non_field_errors;
      }
      else if (error.data.password) {
        errorVar = error.data.password;
      }
      else if (error.data.username) {
        errorVar = error.data.username;
      }
      else if (error.data.email) {
        errorVar = error.data.email;
      }
    }
    if (errorVar) {
      let i = 0;
      for (i = 0; i < errorVar.length; i++) {
        submitError = submitError.concat(errorVar[i]);
      }
    }
    else {
      submitError = "service is currently unavailable, please try again later";
      console.error("Unable to connect to API for login (or unknown error)");
    }

    return submitError;
  }

  return {
    userData: state,
    login,
    logout,
    signup,
    setAccountDetails,
    getAccountDetails,
    handleError,
    // Context state managing functions - warning, not recommended for use!
    // Using these might cause unexpected behaviour for the wrapper functions above (login, logout, etc).
    // If you need to use these, please write a wrapper in this User hook instead. :)
    updateState,
    resetState,
  };
};
