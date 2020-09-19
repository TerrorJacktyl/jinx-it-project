import { useContext } from 'react';
import { UserContext } from 'jinxui';
import { IUserContext } from '../components/contexts/UserContext';
import API from '../../API';
import { AxiosResponse } from 'axios';

export const useUser = () => {
    const [state, setState] = useContext(UserContext);

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

        });
    }

    return {
        login,
        logout,
    }
}