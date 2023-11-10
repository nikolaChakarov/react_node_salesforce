import { useContext, useState, useRef } from 'react';
import { GlobalContext } from '../context/app-context';
import styled from 'styled-components';

const SubmitForm = () => {
    const { handleUploadDataToSalesforce } = useContext(GlobalContext);
    const nameRef = useRef();
    const fileRef = useRef();

    const handleSubmit = async () => {
        const data = {
            customerName: nameRef.current.value,
            file: fileRef.current.files[0],
        };

        handleUploadDataToSalesforce(data);
    };

    return (
        <SubmitStyled>
            <h2>Submit Form</h2>

            <label htmlFor='customerName'>
                <span>name</span>
                <input
                    ref={nameRef}
                    type='text'
                    id='customerName'
                    name='customerName'
                />
            </label>
            <label htmlFor='fileToUpload'>
                <span>Upload Your File</span>
                <input
                    ref={fileRef}
                    type='file'
                    id='fileToUpload'
                    name='fileToUpload'
                />
            </label>

            <div className='btn-wrapper'>
                <button onClick={handleSubmit}>Submit to Salesforce</button>
            </div>
        </SubmitStyled>
    );
};

const SubmitStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

export default SubmitForm;
