import express, { Request, Response } from 'express';
import { validateToken } from '../validators/validateToken';
import authRouter from './auth.routes';
import campaignsRouter from './campaigns.routes';

const router = express.Router();

router.use('/version', (req: Request, res: Response) => {
  res.json({
    'version': '1.0v',
  });
});

router.use(authRouter);

// Routes protected by token

router.use(validateToken);
router.use(campaignsRouter);

export default router;