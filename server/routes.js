import express from 'express';
import { authRouter } from './routes/auth.js';
import { getSObject } from './routes/sobject.js';
import { upload } from './routes/upload.js';

export const router = express.Router();

router.use('/sf/auth', authRouter);
router.use('/sf/sobject', getSObject);
router.use('/sf/upload', upload);
