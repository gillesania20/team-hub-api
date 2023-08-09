import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { commentFindOne } from './../../models/comments/commentQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSingleComment = async (req, res) => {
    const username = req.username;
    const postID = req.body.postID;
    const commentID = req.params.commentID;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let validatedCommentId = false;
    let response = null;
    let findUser = null;
    let findPost = null;
    let findComment = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            comment: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                comment: null
            }
        }else{
            validatedPostId = validateId(postID);
            if(validatedPostId === false){
                response = {
                    status: 400,
                    message: 'invalid post ID',
                    comment: null
                }
            }else{
                findPost = await postFindOne({_id: postID}, '_id');
                if(findPost === null){
                    response = {
                        status: 404,
                        message: 'post not found',
                        comment: null
                    }
                }else{
                    validatedCommentId = validateId(commentID);
                    if(validatedCommentId === false){
                        response = {
                            status: 400,
                            message: 'invalid comment ID',
                            comment: null
                        }
                    }else{
                        findComment = await commentFindOne(
                            {_id: commentID, user: findUser._id.toString(), post: findPost._id.toString()},
                            'body created_at updated_at');
                        if(findComment === null){
                            response = {
                                status: 404,
                                message: 'comment not found',
                                comment: null
                            }
                        }else{
                            response = {
                                status: 200,
                                message: 'comment found',
                                comment: findComment
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, comment: response.comment});
}
export default getSingleComment;