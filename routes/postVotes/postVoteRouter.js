import express from 'express';
import addPostVote from './../../controllers/postVotes/addPostVote.js';
import deletePostVote from './../../controllers/postVotes/deletePostVote.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.post('/', verifyJWT, addPostVote);
router.delete('/:postVoteID', verifyJWT, deletePostVote);
export default router;