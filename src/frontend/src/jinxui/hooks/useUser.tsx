import { useContext } from "react";
import { UserContext } from "jinxui";
import API from "../../API";
import { AxiosRequestConfig } from "axios";
import { TPortfolio, TPage, TSection, TPortfolioData, TPageData, TSectionData } from "../types/PortfolioTypes";
import { ValidationError } from "yup";

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
  const IMAGES_PATH = "api/images";
  const PORTFOLIOS_PATH = "api/portfolios";

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
        // Update internal state about user
        // Do not return until internal state has been updated
        const stateChanges = {
          username: username,
          firstName: accDetails.first_name,
          lastName: accDetails.last_name,
          token: response.data["auth_token"],
          authenticated: true,
          config: config,
        };
        // Update context (react) state and local (browser) state
        await updateState(stateChanges);
        return config;
      }
    } catch (e) {
      throw handleError(e);
    }
  }

  async function savePortfolioId(id: number) {
    try {
      await updateState({
        ...state,
        portfolioId: id,
      });
    } catch (e) {
      throw e;
    }
  }

  async function switchLightThemeMode() {
    try {
      await updateState({
        ...state,
        lightThemeMode: !state.lightThemeMode,
      });
    } catch (e) {
      throw e;
    }
    return state.lightThemeMode;
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
      throw handleError(e);
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
      // Manually update state to include first name, since login normally does this
      // but can't because the firstName/lastName haven't been stored yet.
      // await updateState({firstName: firstName});
      await login(username, password);
      return response;
    } catch (e) {
      throw handleError(e);
    }
  }

  // Declaring a function as async means the return gets wrapped in a promise
  async function uploadImage(file: File, name: string) {
    const form_data = new FormData();
    form_data.append("path", file, file.name);
    form_data.append("name", name);
    try {
      const response = await API.post(IMAGES_PATH, form_data, state.config);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async function postPortfolio(data: TPortfolioData) {
    // const result = API.post(
    //   PORTFOLIOS_PATH,
    //   {
    //     name: data.name,
    //   },
    //   state.config
    // )
    //   .then((response: any) => response)
    //   .catch((error: any) => {
    //     throw error;
    //   });
    // return result;
    // const name = data.name ?

    if (!data) {
      throw ("Portfolio data is null")
    }
    try {
      const response = await API.post(
        PORTFOLIOS_PATH,
        {
          name: data.name,
        },
        state.config
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async function postPage(portfolio_id: string, data: TPageData) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    // const result = API.post(
    //   path,
    //   {
    //     name: data.name,
    //     number: data.number,
    //   },
    //   state.config
    // )
    //   .then((response: any) => response)
    //   .catch((error: any) => {
    //     throw error;
    //   });
    // return result;
    try {
      const response = await API.post(
        path,
        {
          name: data.name,
          number: data.number,
        },
        state.config
      );
      return response;
    } catch (e) {
      throw e;
    }
  }

  async function postSection(
    portfolio_id: string,
    page_id: string,
    data: TSectionData
  ) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections";
    // const result = API.post(path, data, state.config)
    //   .then((response: any) => response)
    //   .catch((error: any) => {
    //     throw error;
    //   });
    // return result;
    try {
      const response = await API.post(path, data, state.config);
      return response;
    } catch (e) {
      throw e;
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
    const result = API.put(
      ACCOUNT_PATH,
      {
        first_name: first_name,
        last_name: last_name,
      },
      konfig
    )
      .then((response) => response)
      .catch((error) => {
        throw handleError(error);
      });
    return result;
  }

  function getSavedPortfolioId() {
    return state.portfolioId;
  }

  function getSavedLightThemeMode() {
    return state.lightThemeMode;
  }

  // Note the $s in the function name. Use this if you want to get all of a user's portfolios
  async function getPortfolios() {
    const path = PORTFOLIOS_PATH;
    try {
      const response: TPortfolio[] = await API.get(path, state.config);
      return response;
    } catch (e) {
      throw e;
    }
    // const result = API.get(path, state.config).then(
    //   (response: any) => response.data
    // );
    // return result;
  }

  // Use this if you want to get a specific portfolio
  async function getPortfolio(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    // const result = API.get(path, state.config)
    //   .then((response: any) => response.data)
    //   .catch((error: any) => {
    //     console.log(error);
    //     throw error;
    //   });
    // return result;
    try {
      const response = await API.get(path, state.config);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async function getPages(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    // const result = API.get(path, state.config)
    //   .then((response: any) => response.data)
    //   .catch((error: any) => {
    //     console.log(error);
    //     throw error;
    //   });
    // return result;
    try {
      const response = await API.get(path, state.config);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async function getAccountDetails(konfig: AxiosRequestConfig = state.config) {
    try {
      const response = await API.get(ACCOUNT_PATH, konfig);
      if ("first_name" in response.data) {
        return response.data;
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getSections(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections";
    // const result = API.get(path, state.config)
    //   .then((response: any) => response.data)
    //   .catch((error: any) => {
    //     console.log(error);
    //     throw error;
    //   });
    // return result;
    try {
      const response = await API.get(path, state.config);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  /* Will retrieve a portoflio, all of its pages, and the first page's sections. 
     Tried to incorporate functionality to fetch all sections corresponding to all pages,
     but ran into a very lame bug with nested list indexing :'( */
  async function getFullPortfolio(portfolio_id: number) {
    try {
      const portfolio: TPortfolio = await getPortfolio(portfolio_id);
      const pages: TPage[] = await getPages(portfolio_id);
      // Define as TSection[][] = [] and uncomment forEach loop when incorporating multiple pages
      const sections: TSection[] = await getSections(portfolio_id, pages[0].id);
      console.log(pages);
      //        pages.forEach(async (page: any) => {
      //          sections.push(await getSections(portfolio_id, page.id))
      //        })
      console.log(sections);
      return { portfolio, pages, sections };
    } catch (e) {
      throw e;
    }
  }

  async function getImage(image_id: number) {
    const path = IMAGES_PATH + "/" + image_id;
    const result = API.get(path, state.config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
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

    // If an authenticated API request failed, the user is likely unauthenticated.
    // Log them in.
    if (state.authenticated) logout();

    if (error.message) {
      errorVar = error.message;
    } else if (error.data) {
      if (error.data.non_field_errors) {
        errorVar = error.data.non_field_errors;
      } else if (error.data.password) {
        errorVar = error.data.password;
      } else if (error.data.username) {
        errorVar = error.data.username;
      } else if (error.data.email) {
        errorVar = error.data.email;
      }
    }
    if (errorVar) {
      let i = 0;
      for (i = 0; i < errorVar.length; i++) {
        submitError = submitError.concat(errorVar[i]);
      }
    } else {
      submitError = "service is currently unavailable, please try again later";
      console.error("Unable to connect to API for login (or unknown error)");
    }

    return submitError;
  };

  return {
    userData: {
      ...state,
      // Extra function
      name: `${state.firstName} ${state.lastName}`,
    },
    login,
    savePortfolioId,
    switchLightThemeMode,
    logout,
    signup,
    setAccountDetails,
    uploadImage,
    postPortfolio,
    postPage,
    postSection,
    getPortfolios,
    getPortfolio,
    getPages,
    getSections,
    getFullPortfolio,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    getImage,
    getAccountDetails,
    handleError,
    // Context state managing functions - warning, not recommended for use!
    // Using these might cause unexpected behaviour for the wrapper functions above (login, logout, etc).
    // If you need to use these, please write a wrapper in this User hook instead. :)
    updateState,
    resetState,
  };
};
