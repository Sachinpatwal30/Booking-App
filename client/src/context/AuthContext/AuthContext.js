import { createContext, useEffect, useReducer } from "react";

export const INITIAL_STATE = {

    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: null,

};


const reducer = (state, action) => {

    switch (action.type) {

        case "LOGIN_START": return { user: null, isFetching: true, error: null };
        case "LOGIN_SUCCESS": return { user: action.payload, isFetching: false, error: null };
        case "LOGIN_FAILURE": return { user: null, isFetching: false, error: action.payload };
        case "LOG_OUT": return { user: null, isFetching: false, error: null };
        default: return new Error("Invalid action");
    }
}


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {

        localStorage.setItem('user', JSON.stringify(state.user));


    }, [state.user])

    return <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }} >
        {children}
    </AuthContext.Provider>

}