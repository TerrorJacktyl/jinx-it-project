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

    async function login(username: string, password: string): Promise<AxiosResponse<any>> {
        const response = await API.post(LOGIN_PATH, { username: username, password: password });

        return new Promise((resolve, reject) => {
            if ('auth_token' in response.data) {
                resolve(response.data);
            }
            else
                reject(response);
        })

        // .then(response => {
        //     console.log(response);
        //     console.log(response.data);
        // })
        // .catch(response => {
        //     console.error(response);
        // })
        // return await response;
    }

    async function logout() {
        const response = API.post(LOGOUT_PATH);
        return await response;
    }

    return {
        login,
        logout,
    }
}