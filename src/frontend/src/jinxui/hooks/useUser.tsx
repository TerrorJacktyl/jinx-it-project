import { useContext } from "react";
import { UserContext } from "jinxui";
import API from "../../API";
import { AxiosRequestConfig } from "axios";
import {
  TPortfolio,
  TPage,
  TSection,
  TPortfolioData,
  TSectionData,
} from "../types/PortfolioTypes";

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
  const ACCOUNT_PATH = "api/accounts";
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
          portfolioId: accDetails.primary_portfolio,
          // theme: accDetails.theme,
          theme: accDetails.theme,
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
  async function uploadImage(file: File, name: string, setProgress: any) {
    const form_data = new FormData();
    form_data.append("path", file, file.name);
    form_data.append("name", name);

    const local_config = {
      ...state.config, 
      onUploadProgress: (progressEvent:any) => {
        const prog = Math.round(100 * progressEvent.loaded / progressEvent.total)
        setProgress(prog)
      }
    }

    const result = API.post(IMAGES_PATH, form_data, local_config)
      .then((response: any) => response)
      .catch((error: any) => {
        throw error;
      });
    return result;
  }

  async function postPortfolio(data: TPortfolioData) {
    if (!data) {
      throw "Portfolio data is null";
    }
    try {
      const response = await API.post(
        PORTFOLIOS_PATH,
        {
          name: data.name,
        },
        state.config
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  async function postPage(portfolio_id: string, data: any) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    try {
      const response = await API.post(
        path,
        {
          name: data.name,
          number: data.number,
        },
        state.config
      );
      return response.data;
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
    try {
      const response = await API.post(path, data, state.config);
      return response.data;
    } catch (e) {
      throw e;
    }
  }

  // TODO: Fix types
  async function putPortfolio(portfolio: any) {
    const path = PORTFOLIOS_PATH + "/" + portfolio.id;
    try {
      const response = API.put(path, portfolio, state.config);
      return response;
    } catch (e) {
      throw e;
    }
  }

  // TODO: Fix types
  async function putPage(portfolioId: any, page: any) {
    const path = PORTFOLIOS_PATH + "/" + portfolioId + "/pages/" + page.id;
    try {
      const response = await API.put(path, page, state.config);
      return response;
    } catch (e) {
      throw e;
    }
  }

  // TODO: Fix types
  async function putSections(portfolioId: any, pageId: any, sections: any) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolioId + "/pages/" + pageId + "/sections";
    try {
      const response = await API.put(path, sections, state.config);
      return response;
    } catch (e) {
      throw e;
    }
  }

  /* Should only be used for CREATION of a new portfolio. Only handles the posting of a 
     new portfolio with a single page at the moment. Change sections type to TSections[][] 
     when multpile pages are accounted for */
  // TODO: Fix the types
  async function postFullPortfolio(
    portfolio: any,
    pages: any[],
    sections: any[]
  ) {
    try {
      const portfolioResp = await postPortfolio(portfolio);
      const pageResp = await postPage(portfolioResp.id, pages[0]);
      const sectionResp = await putSections(
        portfolioResp.id,
        pageResp.id,
        sections
      );
      // Assures redirection to the newly created portfolio
      await savePortfolioId(parseInt(portfolioResp.id));
      return { portfolioResp, pageResp, sectionResp };
    } catch (e) {
      throw e;
    }
  }

  /* Should only be used for UPDATING an existing portoflio. Only handles a single page
     at the moment, use pages.forEach to put the page and its corresponding sections later */
  // TODO: Fix types and refactor to try catch
  async function putFullPortfolio(
    portfolio: any,
    pages: any[],
    sections: any[]
  ) {
    try {
      const portfolioResp = await putPortfolio(portfolio);
      const pageResp = await putPage(portfolio.id, pages[0]);
      const sectionsResp = await putSections(
        portfolio.id,
        pages[0].id,
        sections
      );
      return { portfolioResp, pageResp, sectionsResp };
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
      ACCOUNT_PATH + "/me",
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

  // this should probably be merged into setAccountDetails
  async function setPrimaryPortfolio(id: number) {
    try {
      const result = await API.patch(
        ACCOUNT_PATH + "/me",
        {
          primary_portfolio: id,
        },
        state.config
      );
      return result;
    } catch (e) {
      throw e;
    }
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
    const result = API.get(path, state.config).then(
      (response: any) => response.data
    );
    return result;
  }

  // Use this if you want to get a specific portfolio
  async function getPortfolio(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    const result = API.get(path, state.config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  async function getPages(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    const result = API.get(path, state.config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  async function getAccountDetails(konfig: AxiosRequestConfig = state.config) {
    try {
      const response = await API.get(ACCOUNT_PATH + "/me", konfig);
      if ("first_name" in response.data) {
        return response.data;
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getAccountDetailsFromUsername(
    username: string
  ): Promise<{
    first_name: string;
    last_name: string;
    primary_portfolio: number;
  }> {
    try {
      const response = await API.get(
        ACCOUNT_PATH + `?username=${username}`,
        state.config
      );
      return response.data[0];
    } catch (error) {
      throw handleError(error);
    }
  }

  async function getSections(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections";
    const result = API.get(path, state.config)
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  function getPortfolioPath(portfolio_id: number) {
    return PORTFOLIOS_PATH + "/" + portfolio_id;
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
      //        pages.forEach(async (page: any) => {
      //          sections.push(await getSections(portfolio_id, page.id))
      //        })
      // console.log(sections);
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

  async function setTheme(portfolio_id: number, theme_name: string) {
    async function savePortfolioTheme(theme: string) {
      try {
        await updateState({
          ...state,
          theme: theme,
        });
      } catch (e) {
        throw e;
      }
    }

    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    API.get(path, state.config)
      .then((response: any) => {
        const result = API.put(
          path,
          {
            name: response.data.name,
            theme: theme_name,
          },
          state.config
        ).then((response: any) => {
          savePortfolioTheme(response.data.theme)
        }).catch((error: any) => {
          console.log(error);
          throw error;
        });
        return result;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
  }

  async function makePortfolioPublic(portfolio_id: number) {
    return changePortfolioPrivacy(portfolio_id, false);
  }

  async function makePortfolioPrivate(portfolio_id: number) {
    return changePortfolioPrivacy(portfolio_id, true);
  }

  async function changePortfolioPrivacy(
    portfolio_id: number,
    privacy: boolean
  ) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    API.get(path, state.config)
      .then((response: any) => {
        const result = API.put(
          path,
          {
            name: response.data.name,
            private: privacy,
          },
          state.config
        ).catch((error: any) => {
          console.log(error);
          throw error;
        });
        return result;
      })
      .catch((error: any) => {
        console.log(error);
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
    userData: state,
    login,
    savePortfolioId,
    switchLightThemeMode,
    logout,
    signup,
    setAccountDetails,
    setPrimaryPortfolio,
    uploadImage,
    postPortfolio,
    postPage,
    postSection,
    putPortfolio,
    putPage,
    putSections,
    postFullPortfolio,
    putFullPortfolio,
    getPortfolios,
    getPortfolio,
    getPages,
    getSections,
    getFullPortfolio,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    getImage,
    getAccountDetails,
    getAccountDetailsFromUsername,
    handleError,
    makePortfolioPublic,
    makePortfolioPrivate,
    getPortfolioPath,
    setTheme,
    // Context state managing functions - warning, not recommended for use!
    // Using these might cause unexpected behaviour for the wrapper functions above (login, logout, etc).
    // If you need to use these, please write a wrapper in this User hook instead. :)
    updateState,
    resetState,
  };
};
