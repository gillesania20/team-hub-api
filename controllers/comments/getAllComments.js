import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { commentFindAndPopulate } from './../../models/comments/commentQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getAllComments = async (req, res) => {
    const username = req.username;
    const postID = req.body.postID;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let response = null;
    let findUser = null;
    let findPost = null;
    let findComments = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            comments: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                comments: null
            }
        }else{
            validatedPostId = validateId(postID);
            if(validatedPostId === false){
                response = {
                    status: 400,
                    message: 'invalid post ID',
                    comments: null
                }
            }else{
                findPost = await postFindOne({_id: postID}, '_id');
                if(findPost === null){
                    response = {
                        status: 404,
                        message: 'post not found',
                        comments: null
                    }
                }else{
                    findComments = await commentFindAndPopulate({post: findPost._id.toString()},
                        'body created_at');
                    response = {
                        status: 200,
                        message: 'comments found',
                        comments: findComments
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, comments: response.comments});
}
export default getAllComments;