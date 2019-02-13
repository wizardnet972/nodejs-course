import express from 'express';
import { v1 } from './v1';
import { async } from '@modules/core';

const router = express.Router();

// localhost/api/
router.all('/', async((req, res) => {
    res.json({ api: 'ok' });
  })
);

// localhost/api/v1
router.use('/v1', v1);

export { router as api };
