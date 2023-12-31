import mongoose from 'mongoose';
import { userFindOne } from './../../models/users/userQueries.js';
import { commentFindOne, commentDeleteOne } from './../../models/comments/commentQueries.js';
import { commentVoteDeleteMany } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteComment = async (req, res) => {
    const username = req.username;
    const commentID = req.params.commentID;
    const validatedUsername = validateUsername(username);
    let validatedCommentId = false;
    let response = null;
    let findUser = null;
    let findComment = null;
    let session = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized'
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found'
            }
        }else{
            validatedCommentId = validateId(commentID);
            if(validatedCommentId === false){
                response = {
                    status: 400,
                    message: 'invalid comment ID'
                }
            }else{
                findComment = await commentFindOne({_id: commentID, user: findUser._id.toString()}, '_id');
                if(findComment === null){
                    response = {
                        status: 404,
                        message: 'comment not found'
                    }
                }else{
                    session = await mongoose.startSession();
                    session.startTransaction();
                    await commentDeleteOne({_id: findComment._id}, {session});
                    await commentVoteDeleteMany({comment: findComment._id}, {session});
                    await session.commitTransaction();
                    session.endSession();
                    response = {
                        status: 200,
                        message: 'comment deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deleteComment;