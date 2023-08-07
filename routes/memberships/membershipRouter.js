import express from 'express';
import addMembership from './../../controllers/memberships/addMembership.js';
import deleteMembership from './../../controllers/memberships/deleteMembership.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.post('/', verifyJWT, addMembership);
router.delete('/:membershipID', verifyJWT, deleteMembership);
export default router;