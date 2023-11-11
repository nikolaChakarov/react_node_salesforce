import express from 'express';
import fileUpload from 'express-fileupload';
import jsforce from 'jsforce';

export const upload = express.Router();

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

    const uploadPath = __dirname + '/uploads/' + fileName;
    file.mv(uploadPath);

    // go for APEX!!

    // body payload structure is depending to the Apex REST method interface.
    var body = { title: 'FILE UPLOAD TEST', file: file };
    conn.apex.post(apexPath, body, function (err, res) {
        if (err) {
            return console.error(err);
        }
        console.log('response: ', res);
        // the response object structure depends on the definition of apex class
    });

    res.status(200).json({ msg: 'ok!!!' });
});
