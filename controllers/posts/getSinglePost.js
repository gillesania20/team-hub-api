import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSinglePost = async (req, res) => {
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
            message: 'not authorized',
            post: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                post: null
            }
        }else{
            validatedPostId = validateId(postID);
            if(validatedPostId === false){
                response = {
                    status: 400,
                    message: 'invalid post ID',
                    post: null
                }
            }else{
                findPost = await postFindOne({_id: postID, user: findUser._id.toString()},
                    '_id body created_at updated_at');
                if(findPost === null){
                    response = {
                        status: 404,
                        message: 'post not found',
                        post: null
                    }
                }else{
                    response = {
                        status: 200,
                        message: 'post found',
                        post: findPost
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, post: response.post});
}
export default getSinglePost;