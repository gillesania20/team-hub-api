import express from 'express';
import addUser from './../../controllers/users/addUser.js';
import getSingleUser from './../../controllers/users/getSingleUser.js';
import updateUser from './../../controllers/users/updateUser.js';
const router = express.Router();
router.post('/', addUser);
router.get('/:userID', getSingleUser);
router.patch('/:userID', updateUser);
export default router;  