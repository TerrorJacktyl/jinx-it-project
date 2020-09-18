import { useContext } from 'react';
import { UserContext } from 'jinxui';
import { IUserContext } from '../components/contexts/UserContext';
import API from '../../API';

export const useUser = () => {
    const [state, setState] = useContext(UserContext);

    const LOGIN_PATH = 'auth/token/login';
    const LOGOUT_PATH = 'auth/token/logout';
    const ACCOUNT_PATH = 'api/accounts/me';

    function login(username: string, password: string) {
        API.post(LOGIN_PATH, { username: username, password: password })
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(response => console.error(response))
    }

    function logout() {
        return;
    }

    return {
        login,
        logout,
    }
}