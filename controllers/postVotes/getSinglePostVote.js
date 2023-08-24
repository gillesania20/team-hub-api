import { userFindOne } from './../../models/users/userQueries.js';
import { postVoteFindOne } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSinglePostVote = async (req, res) => {
    const username = req.username;
    const postVoteID = req.params.postVoteID;
    const validatedUsername = validateUsername(username);
    let validatedPostVoteId = false;
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
            validatedPostVoteId = validateId(postVoteID);
            if(validatedPostVoteId === false){
                response = {
                    status: 400,
                    message: 'invalid post-vote ID',
                    postVote: null
                }
            }else{
                findPostVote = await postVoteFindOne({_id: postVoteID}, 'id vote');
                if(findPostVote === null){
                    response = {
                        status: 404,
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