import express from 'express';
import addOrUpdateCommentVote from './../../controllers/commentVotes/addOrUpdateCommentVote.js';
import deleteCommentVote from './../../controllers/commentVotes/deleteCommentVote.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.post('/', verifyJWT, addOrUpdateCommentVote);
router.delete('/:commentVoteID', verifyJWT, deleteCommentVote);
export default router;