import { createContext, useEffect, useReducer, useContext } from "react";
import { getSessionStorage, saveDataToSessionStorage, } from "../Utils/SessionStorage";

interface GlobalState {
    innerWidth: number;
    isLoggedIn: boolean;
    isLoading: boolean;
    loginError: string | null;
    token: string;
}

interface GlobalAction {
    type: "LOGIN" | "LOGOUT" | "LOGIN_SUCCESS" | "LOGIN_FAILURE" | "SET_DATA" | "SET_INNER_WIDTH";
    payload?: any;
}

type Dispatch = (action: GlobalAction) => void;

interface GlobalContextProps {
    state: GlobalState;
    dispatch: Dispatch;
    login: (payload: any) => void;
    logout: () => void;
    setInnerWidth: (payload: number) => void;

}

const initialState: GlobalState = {
    isLoggedIn: false,
    isLoading: false,
    loginError: null,
    token: "",
    innerWidth: window.innerWidth,
};

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isLoading: true };
        case "LOGOUT":
            return { ...state, isLoggedIn: false, token: "" };
        case "LOGIN_SUCCESS":
            return { ...state, isLoggedIn: true, isLoading: false, token: action.payload };
        case "LOGIN_FAILURE":
            return { ...state, isLoading: false };
        case "SET_INNER_WIDTH":
            return { ...state, isLoading: false, innerWidth: action.payload };
        case "SET_DATA":
            return { ...state, token: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const GlobalContext = createContext<GlobalContextProps>({
    state: initialState,
    dispatch: () => { },
    login: () => { },
    logout: () => { },
    setInnerWidth: () => { },

});

export const GlobalProvider = ({ children }: any) => {
    const cookieState: any = getSessionStorage("USERDATA");

    const [state, dispatch] = useReducer(reducer, { ...initialState, token: cookieState ? cookieState : null, isLoggedIn: cookieState ? true : false });
    const login = async (param: any) => {
        dispatch({ type: "LOGIN" });
        dispatch({ type: "LOGIN_SUCCESS", payload: param });
        saveDataToSessionStorage("USERDATA", param);

    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        saveDataToSessionStorage("USERDATA", null);
    };

    const setInnerWidth = (param: number) => {
        dispatch({ type: "SET_INNER_WIDTH", payload: param });
    };


    const value = { state, dispatch, login, logout, setInnerWidth };

    return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};