import React, { useState } from 'react';

// Type for user context state
export interface IUserContext {
    username: string;
    token: string;
    // Set true when user logged in; set false when token is invalid
    authenticated: boolean;
    theme: string;
}

// Define the context to hold a state object and its setState function.
// Type safety is enforced by the UserProvider wrapper
// Contexts demand a default value, which would mean putting a default both 
// here *and* in the wrapper.
const UserContext = React.createContext<[any, any]>([{}, () => { }]);

// Wrap components in this (rather than <UserContext.Provider>)
const UserContextProvider = (props: any) => {
    const [state, setState] = useState<IUserContext>({
        username: '',
        token: '',
        authenticated: false,
        theme: 'light',
    });

    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };