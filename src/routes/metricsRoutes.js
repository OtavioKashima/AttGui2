import { Router } from 'express';
import * as metricsController from '../controllers/metricsController.js';
import validate from '../middleware/validate.js';
import { metricsSchema, updateMetricsSchema } from '../validation/schemas.js';

const router = Router();

router.get('/', metricsController.getAllMetrics);
router.post('/', validate(metricsSchema), metricsController.createMetric);
router.put('/:id', validate(updateMetricsSchema), metricsController.updateMetric);

export default router;