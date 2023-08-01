import { useState } from 'react';

const App = () => {
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        const dbRes = await fetch('http://localhost:5005/sf/auth', {
            method: 'POST',
        });

        const res = await dbRes.json();

        console.log(res);
        setToken(res.accessToken);
    };

    const getStudent = async () => {
        try {
            const dbRes = await fetch('http://localhost:5005/sf/sobject', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    id: 'a007R000014gBkOQAU',
                }),
            });

            const res = await dbRes.json();

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {token ? (
                <button onClick={getStudent}>Get Student Info</button>
            ) : (
                <button onClick={handleLogin}>Login To Sf</button>
            )}
        </div>
    );
};

export default App;
