import express from 'express';
import addOrUpdatePostVote from './../../controllers/postVotes/addOrUpdatePostVote.js';
import deletePostVote from './../../controllers/postVotes/deletePostVote.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.post('/', verifyJWT, addOrUpdatePostVote);
router.delete('/:postVoteID', verifyJWT, deletePostVote);
export default router;