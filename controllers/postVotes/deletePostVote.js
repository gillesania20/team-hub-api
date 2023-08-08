import { userFindOne } from './../../models/users/userQueries.js';
import { postVoteFindOne, postVoteDeleteOne } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deletePostVote = async (req, res) => {
    const username = req.username;
    const postVoteID = req.params.postVoteID;
    const validatedUsername = validateUsername(username);
    let validatedPostVoteId = false;
    let response = null;
    let findUser = null;
    let findPostVote = null;
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
            validatedPostVoteId = validateId(postVoteID);
            if(validatedPostVoteId === false){
                response = {
                    status: 400,
                    message: 'invalid post-vote ID'
                }
            }else{
                findPostVote = await postVoteFindOne({_id: postVoteID, user: findUser._id.toString()}, '_id');
                if(findPostVote === null){
                    response = {
                        status: 404,
                        message: 'post-vote not found'
                    }
                }else{
                    await postVoteDeleteOne({_id: findPostVote._id.toString()});
                    response = {
                        status: 200,
                        message: 'post-vote deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deletePostVote;