import { useContext } from 'react';
import { GlobalContext } from '../context/app-context';
import styled from 'styled-components';
import useForm from './useForm';

const init = { username: '', password: '' };

const LoginForm = () => {
    const { handleLogin } = useContext(GlobalContext);

    const validator = (val) => {
        const errors = {};

        if (!val.username) {
            errors.username = 'Please, enter username';
        }

        if (!val.password) {
            errors.password = 'Please, enter your password';
        }
        return errors;
    };

    const onSubmit = (val) => {
        console.log(val);
        handleLogin(val);
    };

    const { values, errors, onChangeHandler, onSubmitHandler } = useForm({
        init,
        validator,
        onSubmit,
    });

    return (
        <LoginStyled>
            <h2>Login Form</h2>
            <label htmlFor='username'>
                <span>Salesforce Username</span>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={values.username}
                    onChange={onChangeHandler}
                />
                {errors.username && <p>{errors.username}</p>}
            </label>
            <label htmlFor='password'>
                <span>Password</span>
                <input
                    type='password'
                    id='password'
                    name='password'
                    value={values.password}
                    onChange={onChangeHandler}
                />
                {errors.password && <p>{errors.password}</p>}
            </label>

            <div className='btn-wrapper'>
                <button onClick={onSubmitHandler}>Login</button>
            </div>
        </LoginStyled>
    );
};

const LoginStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

export default LoginForm;
