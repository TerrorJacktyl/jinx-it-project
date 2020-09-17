import React, { useState } from 'react';

// Define the context to hold a state object and its setState function
export const UserContext = React.createContext([{}, () => { }]);

// I have no idea if this is type safe
export const UserContextProvider = (props: any) => {
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        // Set true when user logged in; set false when token is invalid
        authenticated: false,
        token: '',
        theme: 'light',
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}
