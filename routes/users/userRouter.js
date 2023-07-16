import express from 'express';
import getSingleUser from './../../controllers/users/getSingleUser.js';
import updateUser from './../../controllers/users/updateUser.js';
const router = express.Router();
router.get('/:userID', getSingleUser);
router.patch('/:userID', updateUser);
export default router;