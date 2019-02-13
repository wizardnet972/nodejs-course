import express from 'express';
import { async, AppHttpError } from '@modules/core';
import { getAllUsers, createUser, authorization } from '@modules/auth';

const router = express.Router();

router.get('/', authorization, (req, res) => {
  const { user } = req as any;
  res.json({ secure: 'secure data', user });
});

export { router as secure };
