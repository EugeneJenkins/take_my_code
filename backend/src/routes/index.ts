import { Router } from 'express';
import animalRoutes from './animalRoutes';

const router = Router();

router.use('/animals', animalRoutes);

export default router;
