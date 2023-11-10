import express from 'express';
import fileUpload from 'express-fileupload';
import jsforce from 'jsforce';

export const upload = express.Router();

upload.post('/', async (req, res) => {
    // current is a NAME provided at the frontend. can be anything :)
    console.log(req.files.current);
    console.log(req.body);

    const file = req.files.current;
    const fileName = file.name;

    const uploadPath = __dirname + '/uploads/' + fileName;
    file.mv(uploadPath);

    res.status(200).json({ msg: 'ok!!!' });
});
