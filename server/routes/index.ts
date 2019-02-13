import { Router } from 'express';
import { api } from './api';

const router = Router();

// cors
router.use('/api', api);

export { router as routes };
