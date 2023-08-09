import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { commentFindOne, commentUpdateOne } from './../../models/comments/commentQueries.js';
import { validateUsername, validateId, validateBody } from './../../functions/validation.js';
const updateComment = async (req, res) => {
    const username = req.username;
    const postID = req.body.postID;
    const commentID = req.params.commentID;
    const body = req.body.body;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let validatedCommentId = false;
    let validatedBody = false;
    let response = null;
    let findUser = null;
    let findPost = null;
    let findComment = null;
    let update = {}
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
                findPost = await postFindOne({_id: postID}, '_id');
                if(findPost === null){
                    response = {
                        status: 404,
                        message: 'post not found'
                    }
                }else{
                    validatedCommentId = validateId(commentID);
                    if(validatedCommentId === false){
                        response = {
                            status: 400,
                            message: 'invalid comment ID'
                        }
                    }else{
                        findComment = await commentFindOne(
                            {_id: commentID, user: findUser._id.toString(), post: findPost._id.toString()}, '_id');
                        if(findComment === null){
                            response = {
                                status: 404,
                                message: 'comment not found'
                            }
                        }else{
                            if(typeof body !== 'undefined'){
                                validatedBody = validateBody(body)
                            }
                            if(typeof body !== 'undefined' && validatedBody === false){
                                response = {
                                    status: 400,
                                    message: 'invalid body. should start with any character followed by any character or white space. minimum 1 and maximum 500 characters'
                                }
                            }else{
                                if(typeof body !== 'undefined'){
                                    update.body = body;
                                }
                                await commentUpdateOne({_id: findComment._id.toString()}, update);
                                response = {
                                    status: 200,
                                    message: 'updated comment data'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default updateComment;