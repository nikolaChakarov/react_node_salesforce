import { useContext, useState, useRef } from 'react';
import { GlobalContext } from '../context/app-context';
import styled from 'styled-components';

const SubmitForm = () => {
    const { handleUploadDataToSalesforce, token } = useContext(GlobalContext);
    const nameRef = useRef();
    const fileRef = useRef();

    const [noFileSelectdError, setNoFileSelectedError] = useState(false);

    const [apexContarcts, setApexContracts] = useState([]);

    const handleFileChange = () => {
        setNoFileSelectedError(false);
    };

    const handleSubmit = async () => {
        const data = {
            customerName: nameRef.current.value,
            file: fileRef.current.files[0],
        };

        if (!fileRef.current.files[0]) {
            setNoFileSelectedError(true);
            return;
        }

        handleUploadDataToSalesforce(data);
    };

    // const handleFetchRecordList = async () => {
    //     const dbRes = await fetch('http://localhost:5005/sf/sobject/single', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: '00D06000000yu0j!ARIAQFGj1sIEeNRnwTf1BV8YW7tRJKNRbudcLtpkksUq_sQ_eH5MMBvfN6HHHy8onGxC6u8DqeH3RJqwvHE5I0CgtHRHKDWU',
    //             id: '8000600000BZhTCAA1',
    //         }),
    //     });

    //     const res = await dbRes.json();
    //     console.log(res);
    // };

    const handleFetchRecordList = async () => {
        const dbRes = await fetch('http://localhost:5005/sf/sobject/apex', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token:
                    token ||
                    '00D06000000yu0j!ARIAQFGj1sIEeNRnwTf1BV8YW7tRJKNRbudcLtpkksUq_sQ_eH5MMBvfN6HHHy8onGxC6u8DqeH3RJqwvHE5I0CgtHRHKDWU',
                id: '8000600000BZhTCAA1',
                apexPath: '/services/apexrest/api/webhooks/',
            }),
        });

        const { message, payload } = await dbRes.json();
        console.log(payload.objList);
        setApexContracts((prev) => [...payload.objList]);
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
                    onChange={handleFileChange}
                />
                {noFileSelectdError && <p>Please, select a file to upload</p>}
            </label>

            <div className='btn-wrapper'>
                <button onClick={handleSubmit}>Submit to Salesforce</button>
            </div>

            <div className='btn-wrapper'>
                <button onClick={handleFetchRecordList}>
                    Fetch Contracts List From SF
                </button>
            </div>

            <hr />
            {apexContarcts.length
                ? apexContarcts.map((ctr, idx) => (
                      <p key={idx}>
                          Contact Id: <span>{ctr.Id}</span>, Related Account
                          Name:
                          <span>{ctr.Account.Name}</span>, Start Date:
                          <span>{ctr.StartDate}</span>, End Date:
                          <span>{ctr.EndDate}</span>
                      </p>
                  ))
                : null}
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

    span {
        font-weight: bold;
    }
`;

export default SubmitForm;
