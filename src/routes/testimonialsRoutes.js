import { Router } from 'express';
import * as testimonialsController from '../controllers/testimonialsController.js';
import validate from '../middleware/validate.js';
import { testimonialSchema } from '../validation/schemas.js';

const router = Router();

router.get('/public', testimonialsController.getPublicTestimonials);
router.get('/admin', testimonialsController.getAdminTestimonials);
router.post('/', validate(testimonialSchema), testimonialsController.createTestimonial);
router.patch('/:id/approve', testimonialsController.approveTestimonial);
router.delete('/:id', testimonialsController.deleteTestimonial);

export default router;