import { useState } from 'react';

const useForm = ({ init, validator, onSubmit }) => {
    const [values, setValues] = useState(init);
    const [errors, setErrors] = useState({});

    const onChangeHandler = (e) => {
        setValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const errs = validator(values);
        const errsKeys = Object.keys(errs);
        if (errsKeys.length) {
            setErrors(errs);
            return;
        }

        onSubmit(values);
    };

    return { values, errors, onChangeHandler, onSubmitHandler };
};

export default useForm;
