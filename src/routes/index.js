import { Router } from 'express';
import teamRoutes from './teamRoutes.js';
import metricsRoutes from './metricsRoutes.js';
import testimonialsRoutes from './testimonialsRoutes.js';

const router = Router();

// Agrega as rotas dos recursos
router.use('/team', teamRoutes);
router.use('/metrics', metricsRoutes);
router.use('/testimonials', testimonialsRoutes);

export default router;