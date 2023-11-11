import { useContext } from 'react';
import { GlobalContext } from './context/app-context';
import LoginForm from './login-form/login-form';
import SubmitForm from './submit-form/submit-form';

const App = () => {
    const { token } = useContext(GlobalContext);

    return <div>{!token ? <SubmitForm /> : <LoginForm />}</div>;
};

export default App;
