import { userFindOne } from './../../models/users/userQueries.js';
import { postVoteFindOne } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSinglePostVote = async (req, res) => {
    const username = req.username;
    const postID = req.params.postID;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let findUser = null;
    let findPostVote = null;
    let response = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            postVote: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                postVote: null
            }
        }else{
            validatedPostId = validateId(postID);
            if(validatedPostId === false){
                response = {
                    status: 400,
                    message: 'invalid post ID',
                    postVote: null
                }
            }else{
                findPostVote = await postVoteFindOne({user: findUser._id, post: postID}, 'id vote');
                if(findPostVote === null){
                    response = {
                        status: 200,
                        message: 'post-vote not found',
                        postVote: null
                    }
                }else{
                    response = {
                        status: 200,
                        message: 'post-vote found',
                        postVote: findPostVote
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, postVote: response.postVote});
}
export default getSinglePostVote;