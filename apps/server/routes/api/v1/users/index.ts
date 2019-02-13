import express from 'express';
import { async, AppHttpError } from '@modules/core';
import { getAllUsers, createUser, login } from '@modules/auth';

const router = express.Router();

router.post('/', async(createUser));

router.post('/login', async(login));

router.get('/', async(getAllUsers));

export { router as users };
