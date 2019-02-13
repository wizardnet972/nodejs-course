import express from 'express';
import { async, AppHttpError } from '@modules/core';
import { getAllUsers } from '@modules/auth';

const router = express.Router();

router.get('/', async(getAllUsers));

export { router as users };
