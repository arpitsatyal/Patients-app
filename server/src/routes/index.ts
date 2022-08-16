import { Router } from 'express';

import authRoutes from './auth';
import patientRoutes from './patients';

const router = Router();

router.use('/', authRoutes);
router.use('/patients', patientRoutes);

export default router;