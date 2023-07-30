import express from 'express';
import jsforce from 'jsforce';

export const getSObject = express.Router();

getSObject.post('/', (req, res, next) => {
	const { token, id } = req.body;

	const conn = new jsforce.Connection({
		instanceUrl: process.env.SF_INSTANCE,
		accessToken: token,
	});

	// Single record retrieval
	conn.sobject('Student__c').retrieve(id, function (err, account) {
		if (err) {
			return console.error(err);
		}
		console.log('Name : ' + account.Student_Name__c);
		// ...
	});

	res.json({ message: 'ok' });
});
