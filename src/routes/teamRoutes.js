import { Router } from 'express';
import * as teamController from '../controllers/teamController.js';
import validate from '../middleware/validate.js';
import { teamSchema, updateTeamSchema } from '../validation/schemas.js';

const router = Router();

router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);
router.post('/', validate(teamSchema), teamController.createTeamMember);
router.put('/:id', validate(updateTeamSchema), teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

export default router;