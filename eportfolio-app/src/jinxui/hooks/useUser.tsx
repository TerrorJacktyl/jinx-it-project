import { useContext, useState, useEffect } from "react";
import { UserContext } from "jinxui";
import API from "../../API";
import { AxiosRequestConfig, AxiosResponse } from "axios";

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
        // Update internal state about user
        // Do not return until internal state has been updated
        const stateChanges = {
          username: username,
          token: response.data["auth_token"],
          authenticated: true,
          config: config,
        }
        // Update context (react) state and local (browser) state
        await updateState(stateChanges);
        return config;
      }
    } catch (e) {
      throw e;
    }
  }

  // Another style: await with try catch
  async function logout() {
    try {
      const response = await API.post(LOGOUT_PATH);
      // make the success more concrete when we've defined a status code on backend
      if (response.status in [200, 201, 202, 203, 204]) {
        // Reset context state to default, and clear browser-stored user data
        resetState();
        return response;
      }
    } catch (e) {
      throw e.message;
    }
  }

  // Declaring a function as async means the return gets wrapped in a promise
  async function signup(
    email: string,
    password: string,
    first_name?: string,
    last_name?: string
  ) {
    try {
      const response = await API.post(SIGNUP_PATH, {
        username: email,
        password: password,
        email: email,
      });
      return response;
    } catch (e) {
      throw e.response.data.username[0];
    }
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

  return {
    userData: state,
    login,
    logout,
    signup,
    setAccountDetails,
    // Context state managing functions - warning, not recommended for use!
    // Using these might cause unexpected behaviour for the wrapper functions above (login, logout, etc).
    // If you need to use these, please write a wrapper in this User hook instead. :)
    updateState,
    resetState,
  };
};
