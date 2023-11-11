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
        // to delete!
        const tokenForTestNotToLoginAllTheTime =
            '00D06000000yu0j!ARIAQFGj1sIEeNRnwTf1BV8YW7tRJKNRbudcLtpkksUq_sQ_eH5MMBvfN6HHHy8onGxC6u8DqeH3RJqwvHE5I0CgtHRHKDWU';

        formData.append(
            'salesforceAuthToken',
            state.token || tokenForTestNotToLoginAllTheTime
        );
        formData.append('apexPath', '/services/apexrest/api/webhooks/');

        // no content type when we use FormData
        const dbresJson = await fetch(
            'http://localhost:5005/sf/upload/apex-file',
            {
                body: formData,
                method: 'POST',
            }
        );

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
