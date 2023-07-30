import express from 'express';
import { authRouter } from './routes/auth.js';
import { getSObject } from './routes/sobject.js';

export const router = express.Router();

router.use('/sf/auth', authRouter);
router.use('/sf/sobject', getSObject);
