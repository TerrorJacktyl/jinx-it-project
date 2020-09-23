import { useContext, useState, useEffect } from 'react';
import { UserContext } from 'jinxui';
import { IUserContext, defaultUserContext } from 'jinxui';
import API from '../../API';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const useUser = () => {
    const [state, setState] = useContext(UserContext);

    // Used to specify authentication as a custom header when logged in
    const [config, setConfig] = useState<AxiosRequestConfig>({});

    const LOGIN_PATH = 'auth/token/login';
    const LOGOUT_PATH = 'auth/token/logout';
    const ACCOUNT_PATH = 'api/accounts/me';
    const SIGNUP_PATH = 'auth/users';

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
                setConfig(config);
                // Update internal state about user
                // Do not return until internal state has been updated
                await setState((state: IUserContext) => {
                    return {
                        ...state, username: username,
                        token: response.data['auth_token'],
                        authenticated: true,
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
                // Wipe axios headers, we just killed our token
                setConfig({});
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
    async function setAccountDetails(first_name?: string, last_name?: string, konfig: AxiosRequestConfig = config) {
        API.put(ACCOUNT_PATH, {
            first_name: first_name,
            last_name: last_name,
        }, konfig)
            .then(response => response)
            .catch(error => { throw error });
    }

    async function getAccountDetails(konfig: AxiosRequestConfig = config){
        API.get(ACCOUNT_PATH, konfig)
            .then(response => {
                setState((state: IUserContext) => {
                    return {
                        ...state,
                        firstName: JSON.parse(response.data.first_name),
                    };
                });
            })
            .catch(error => { throw error });
    }

    return {
        userData: state,
        login,
        logout,
        signup,
        setAccountDetails,
        // Expose the axios config so you can edit headers yourself
        // Preferably don't do this - abstract your call into this hook
        // so the hook is the only one that manages its state (easier to debug)
        config,
        setConfig,
    }
}