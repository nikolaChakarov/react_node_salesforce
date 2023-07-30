import express from 'express';
import jsforce from 'jsforce';

export const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
	const conn = new jsforce.Connection({
		oauth2: {
			// you can change loginUrl to connect to sandbox or prerelease env.
			// loginUrl : 'https://test.salesforce.com',
			clientId: process.env.SF_CLIENT_ID,
			clientSecret: process.env.SF_CLIENT_SECRET,
			//   redirectUri : '<callback URI is here>'
		},
	});

	conn.login(
		process.env.SF_USERNAME,
		process.env.SF_PASSWORD,
		function (err, userInfo) {
			if (err) {
				return console.error(err);
			}
			// Now you can get the access token and instance URL information.
			// Save them to establish connection next time.
			console.log(conn.accessToken);
			console.log(conn.instanceUrl);
			// logged in user property
			console.log('User ID: ' + userInfo.id);
			console.log('Org ID: ' + userInfo.organizationId);
			// ...

			res.status(201).json({ accessToken: conn.accessToken });
		}
	);
});
