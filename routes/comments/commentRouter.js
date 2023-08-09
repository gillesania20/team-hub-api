import express from 'express';
import addComment from './../../controllers/comments/addComment.js';
import deleteComment from './../../controllers/comments/deleteComment.js';
import getAllComments from './../../controllers/comments/getAllComments.js';
import getSingleComment from './../../controllers/comments/getSingleComment.js';
import updateComment from './../../controllers/comments/updateComment.js';
import verifyJWT from './../../middlewares/verifyJWT.js';
const router = express.Router();
router.get('/', getAllComments);
router.get('/:commentID', getSingleComment);
router.post('/', verifyJWT, addComment);
router.patch('/:commentID', updateComment);
router.delete('/:commentID', deleteComment);
export default router;