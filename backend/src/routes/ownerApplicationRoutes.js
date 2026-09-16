import express from 'express';
const router = express.Router();

import authenticate from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';
import {
    submitApplication,
    getMyApplication,
    listApplications,
    approveApplication,
    rejectApplication
} from '../controllers/ownerApplicationController.js';

// Owner-facing
router.post('/', authenticate, roleCheck('owner'), submitApplication);
router.get('/me', authenticate, roleCheck('owner'), getMyApplication);

// Admin-facing
router.get('/', authenticate, roleCheck('admin'), listApplications);
router.patch('/:id/approve', authenticate, roleCheck('admin'), approveApplication);
router.patch('/:id/reject', authenticate, roleCheck('admin'), rejectApplication);

export default router;