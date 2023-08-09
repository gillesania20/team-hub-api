import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne, postDeleteOne } from './../../models/posts/postQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deletePost = async (req, res) => {
    const username = req.username;
    const postID = req.params.postID;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let response = null;
    let findUser = null;
    let findPost = null;
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
                    await postDeleteOne({_id: findPost._id.toString()});
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