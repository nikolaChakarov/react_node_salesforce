import express from 'express';
import jsforce from 'jsforce';

export const getSObject = express.Router();

getSObject.post('/single', (req, res, next) => {
    const { token, id } = req.body;

    console.log(token);

    const conn = new jsforce.Connection({
        instanceUrl: process.env.SF_INSTANCE,
        accessToken: token,
    });

    conn.sobject('Contract').retrieve(id, function (err, contract) {
        if (err) {
            return console.error(err);
        }
        console.log(contract);
        res.status(200).json({ message: 'ok', payload: contract });
    });
});

getSObject.post('/apex', (req, res, next) => {
    const { token, apexPath } = req.body;

    const conn = new jsforce.Connection({
        instanceUrl: process.env.SF_INSTANCE,
        accessToken: token,
    });

    console.log('apex path::', apexPath);

    // body payload structure is depending to the Apex REST method interface.
    // var body = { title: 'hello', num: 1 }; // for POST
    conn.apex.get(apexPath, function (err, ap) {
        if (err) {
            return console.error(err);
        }
        console.log('response: ', ap);
        // the response object structure depends on the definition of apex class

        res.status(200).json({ message: 'ok', payload: ap });
    });
});
