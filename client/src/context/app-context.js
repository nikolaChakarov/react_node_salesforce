import { useReducer, createContext } from 'react';
import AppReducer from './app-reducer';

const init = {
    token: null,
};

export const GlobalContext = createContext(init);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, init);

    const handleLogin = async (userInfo) => {
        const dbRes = await fetch('http://localhost:5005/sf/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });

        const res = await dbRes.json();

        console.log(res);
        dispatch({
            type: 'LOGIN',
            payload: res.accessToken,
        });
    };

    const handleUploadDataToSalesforce = async (data) => {
        const formData = new FormData();
        formData.append('current', data.file);
        formData.append('salesforceAuthToken', state.token);

        // no content type when we use FormData
        const dbresJson = await fetch('http://localhost:5005/sf/upload', {
            body: formData,
            method: 'POST',
        });

        const res = await dbresJson.json();
        console.log(res);
    };

    return (
        <GlobalContext.Provider
            value={{
                token: state.token,
                dispatch,
                handleLogin,
                handleUploadDataToSalesforce,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
