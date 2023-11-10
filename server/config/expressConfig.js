import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { router } from '../routes.js';

export const expressConfig = (app) => {
    app.use(express.json());
    app.use(
        cors({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200, // For legacy browser support
        })
    );

    app.use(fileUpload());
    app.use(router);
};
