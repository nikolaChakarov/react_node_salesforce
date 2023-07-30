import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { expressConfig } from './config/expressConfig.js';

const app = express();
expressConfig(app);

app.listen(5005, () => {
	console.log('app is running at port 5005');
});
