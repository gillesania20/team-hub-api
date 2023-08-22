import express from 'express';
import getSingleMembership from './../../controllers/memberships/getSingleMembership.js';
import getAllMemberships from './../../controllers/memberships/getAllMemberships.js';
import addMembership from './../../controllers/memberships/addMembership.js';
import deleteMembership from './../../controllers/memberships/deleteMembership.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.get('/get-single', verifyJWT, getSingleMembership);
router.get('/', verifyJWT, getAllMemberships);
router.post('/', verifyJWT, addMembership);
router.delete('/:membershipID', verifyJWT, deleteMembership);
export default router;