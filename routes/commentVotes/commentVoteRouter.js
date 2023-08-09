import express from 'express';
import addCommentVote from './../../controllers/commentVotes/addCommentVote.js';
import deleteCommentVote from './../../controllers/commentVotes/deleteCommentVote.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.post('/', verifyJWT, addCommentVote);
router.delete('/:commentVoteID', deleteCommentVote);
export default router;