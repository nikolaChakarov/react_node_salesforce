import express from 'express';
import fileUpload from 'express-fileupload';
import jsforce from 'jsforce';
import fs from 'fs';

export const upload = express.Router();

// end point reached from React and Postman
upload.post('/apex-file', async (req, res) => {
    // values come from formData since we want to send a file and more information in the body;
    const { salesforceAuthToken, apexPath } = req.body;

    const conn = new jsforce.Connection({
        instanceUrl: process.env.SF_INSTANCE,
        accessToken: salesforceAuthToken,
    });

    // current is a NAME provided at the frontend. can be anything :)
    console.log(req.files.current);
    console.log(req.body);

    const file = req.files.current;
    const fileName = file.name;

    // const buf = Buffer.from(file.data);
    // console.log(buf.toString());

    const uploadPath = __dirname + '/uploads/' + fileName;
    file.mv(uploadPath);

    // go for APEX!!

    // body payload structure is depending to the Apex REST method interface.
    // const body = { title: 'FILE UPLOAD TEST', file: file.data };

    // const body = { file: file };
    const body = {
        file: {
            ...file,
            data: file.data.toString('base64'), // buffer to string
        },
    };

    console.log('file::', file);
    conn.apex.post(apexPath, body, function (err, res) {
        if (err) {
            return console.error(err);
        }
        // console.log('response: ', res);
        // the response object structure depends on the definition of apex class
    });

    res.status(200).json({ msg: 'ok!!!' });
});

// // end point reached from Salesforce
upload.post('/api', async (req, res) => {
    // apexFile is set from apex code. it can be anything.
    const file = req.files.apexFile;
    const filename = file.name;

    const convertedFileData = atob(file.data);

    const uploadPath = __dirname + '/uploads/' + filename;
    // file.mv(uploadPath);

    // fs.writeFileSync("10111.pdf", body,'binary');

    fs.writeFileSync(uploadPath, convertedFileData, 'binary');

    res.status(200).json({ msg: 'file successfully received!' });
});
