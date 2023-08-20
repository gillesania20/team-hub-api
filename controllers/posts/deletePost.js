import mongoose from 'mongoose';
import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne, postDeleteOne } from './../../models/posts/postQueries.js';
import { postVoteDeleteMany } from './../../models/postVotes/postVoteQueries.js';
import { commentFind, commentDeleteMany } from './../../models/comments/commentQueries.js';
import { commentVoteDeleteMany } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deletePost = async (req, res) => {
    const username = req.username;
    const postID = req.params.postID;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let response = null;
    let findUser = null;
    let findPost = null;
    let findComments = null;
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
            validatedPostId = validateId(postID);
            if(validatedPostId === false){
                response = {
                    status: 400,
                    message: 'invalid post ID'
                }
            }else{
                findPost = await postFindOne({_id: postID, user: findUser._id.toString()},
                    '_id');
                if(findPost === null){
                    response = {
                        status: 404,
                        message: 'post not found'
                    }
                }else{
                    findComments = await commentFind({post: findPost._id}, '_id');
                    session = await mongoose.startSession();
                    session.startTransaction();
                    await postDeleteOne({_id: findPost._id}, {session});
                    await postVoteDeleteMany({post: findPost._id}, {session});
                    await commentDeleteMany({post: findPost._id}, {session});
                    await commentVoteDeleteMany({comment: {$in: findComments}}, {session});
                    await session.commitTransaction();
                    session.endSession();
                    response = {
                        status: 200,
                        message: 'post deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deletePost;