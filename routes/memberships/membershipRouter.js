import express from 'express';
import getAllMemberships from './../../controllers/memberships/getAllMemberships.js';
import addMembership from './../../controllers/memberships/addMembership.js';
import deleteMembership from './../../controllers/memberships/deleteMembership.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.get('/', verifyJWT, getAllMemberships);
router.post('/', verifyJWT, addMembership);
router.delete('/:membershipID', verifyJWT, deleteMembership);
export default router;