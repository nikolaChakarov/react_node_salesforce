import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';

// __dirname not working on node type: module!!!
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__dirname = __dirname;

import express from 'express';
import { expressConfig } from './config/expressConfig.js';

const app = express();

expressConfig(app);

app.listen(5005, () => {
    console.log('app is running at port 5005');
});
