import { useContext, useState } from 'react';
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

    /**
     * Abstract the login procedure. Returns the auth_token if login succeeded, 
     * or the backend response if it failed.
     * @param username 
     * @param password 
     */
    async function login(username: string, password: string): Promise<AxiosResponse<any>> {
        const response = await API.post(LOGIN_PATH, { username: username, password: password });

        return new Promise((resolve, reject) => {
            // Login successful
            if ('auth_token' in response.data) {
                resolve(response.data);
                // Set auth header to authenticate future requests
                setConfig({
                    headers: {
                        'Authorization': 'Token ' + response.data.auth_token
                    }
                });
                // Update internal state about user
                setState((state: IUserContext) => {
                    return {
                        ...state, username: username,
                        token: response.data['auth_token'],
                        authenticated: true,
                    };
                });
            }
            // Login failed
            else {
                reject(response);
            }
        });
    }

    async function logout() {
        const response = await API.post(LOGOUT_PATH);

        return new Promise((resolve, reject) => {
            // Swagger currently returns 204 (unexpected) status for logout
            // Change this when API has well-defined logout success response
            if (response.status in [200, 201, 202, 203, 204]) {
                // Update internal user state to reflect sign out
                setState(defaultUserContext);
                // Wipe axios headers, we just killed our token
                setConfig({});
                resolve(response);
            }
            else
                reject(response);
        });
    }

    async function setAccountDetails(first_name?: string, last_name?: string) {
        const response = await API.put(ACCOUNT_PATH, {
            first_name: first_name,
            last_name: last_name,
        }, config);

        return new Promise((resolve, reject) => {
            if (isSuccessful(response))
                resolve(response);
            else
                reject(response);
        })
    }

    // async function getPortfolio(id?: number) {
    //     const response = await API.get();
    // }

    return {
        login,
        logout,
    }
}

const isSuccessful = (response: AxiosResponse) => {
    return (response.status === 200);
}