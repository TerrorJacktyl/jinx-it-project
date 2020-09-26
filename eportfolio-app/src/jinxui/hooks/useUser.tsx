import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'jinxui';
import { IUserContext, defaultUserContext } from 'jinxui';
import API from '../../API';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TPortfolio, TPage, TSection } from '../../Types';

export const useUser = () => {
    const [state, setState] = useContext(UserContext);

    const LOGIN_PATH = 'auth/token/login';
    const LOGOUT_PATH = 'auth/token/logout';
    const ACCOUNT_PATH = 'api/accounts/me';
    const SIGNUP_PATH = 'auth/users';
    const IMAGE_PATH = 'api/images';
    const PORTFOLIOS_PATH = 'api/portfolios'

    /**
     * Abstract the login procedure. Returns the auth_token if login succeeded, 
     * or the backend response if it failed.
     * @param username 
     * @param password 
     */
    async function login(username: string, password: string) {
        try {
            const response = await API.post(LOGIN_PATH, { username: username, password: password });
            if ('auth_token' in response.data) {
                // Set auth header to authenticate future requests
                const config = {
                    headers: {
                        'Authorization': 'Token ' + response.data.auth_token
                    }
                }
                // Update internal state about user
                // Do not return until internal state has been updated
                await setState((state: IUserContext) => {
                    return {
                        ...state, username: username,
                        token: response.data['auth_token'],
                        authenticated: true,
                        config: config,
                    };
                });
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
                // Update internal user state to reflect sign out
                setState(defaultUserContext);
                return response;
            }
        } catch (e) {
            throw e.message;
        }
    }

    // Declaring a function as async means the return gets wrapped in a promise
    async function signup(username: string, email: string, password: string, first_name?: string, last_name?: string) {
        try {
            const response = await API.post(SIGNUP_PATH,
                {
                    username: username,
                    password: password,
                    email: email,
                }
            );
            return response;
        } catch (e) {
            throw e
        }
    }

    /**
     * Update the logged in user's account details.
     * @param first_name 
     * @param last_name 
     * @param konfig ignore this, you don't need this argument - only used for sign up trickery
     */
    async function setAccountDetails(first_name?: string, last_name?: string, konfig: AxiosRequestConfig = state.config) {
        API.put(ACCOUNT_PATH, {
            first_name: first_name,
            last_name: last_name,
        }, konfig)
            .then((response: any) => response)
            .catch((error: any) => { throw error });
    }

    async function getAccountDetails() {
        API.get(ACCOUNT_PATH, state.config)
            .then((response: { data: { first_name: string; }; }) => {
                setState((state: IUserContext) => {
                    return {
                        ...state,
                        firstName: JSON.parse(response.data.first_name),
                    };
                });
            })
            .catch((error: any) => { throw error });
    }

    // Declaring a function as async means the return gets wrapped in a promise
    async function uploadImage(file: File, name: string) {
        const form_data = new FormData();
        form_data.append("image", file, file.name);
        form_data.append("name", name);
        const result = API.post(IMAGE_PATH, form_data, state.config)
            .then((response: any) => response)
            .catch((error: any) => { throw error });
        return result
    }

    async function postPortfolio(data: any) {
        const result = API.post(PORTFOLIOS_PATH, {
            name: data.name
        }, state.config)
            .then((response: any) => response)
            .catch((error: any) => { throw error });
        return result
    }

    async function postPage(portfolio_id: string, data: any) {
        const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages"
        const result = API.post(path, {
            name: data.name,
            number: data.number
        }, state.config)
            .then((response: any) => response)
            .catch((error: any) => { throw error });
        return result
    }

    async function postSection(portfolio_id: string, page_id: string, data: any) {
        const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections"
        const result = API.post(path, data, state.config)
            .then((response: any) => response)
            .catch((error: any) => { throw error });
    }

    // Note the $s in the function name. Use this if you want to get all of a user's portfolios
    async function getPortfolios() {
      const path = PORTFOLIOS_PATH
      const result = API.get(path, state.config)
        .then((response: any) =>
          response.data
        );
        return result
    }

    // Use this if you want to get a specific portfolio
    async function getPortfolio(portfolio_id: number) {
      const path = PORTFOLIOS_PATH + "/" + portfolio_id
      const result = API.get(path, state.config)
        .then((response: any) =>
          response.data
        )
        .catch((error: any) => {
          console.log(error)
          throw error
        });
        return result
    }

    async function getPages(portfolio_id: number) {
      const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages"
      const result = API.get(path, state.config)
        .then((response: any) =>
          response.data
        )
        .catch((error: any) => {
          console.log(error)
          throw error
        });
        return result
    }

    async function getSections(portfolio_id: number, page_id: number) {
      const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/sections"
      const result = API.get(path, state.config)
        .then ((response: any) =>
          response.data
        ).catch((error: any) => {
          console.log(error)
          throw error
        });
        return result
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
        return { portfolio, pages, sections }
      } catch (e) {
        throw e
      }
   }

    return {
        userData: state,
        login,
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
        getFullPortfolio
        // Expose the axios config so you can edit headers yourself
        // Preferably don't do this - abstract your call into this hook
        // so the hook is the only one that manages its state (easier to debug)
        // config: state.config,
    }
}