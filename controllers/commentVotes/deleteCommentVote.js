import { userFindOne } from './../../models/users/userQueries.js';
import { commentVoteFindOne, commentVoteDeleteOne } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteCommentVote = async (req, res) => {
    const username = req.username;
    const commentVoteID = req.params.commentVoteID;
    const validatedUsername = validateUsername(username);
    let validatedCommentVoteId = false;
    let response = null;
    let findUser = null;
    let findCommentVote = null;
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
            validatedCommentVoteId = validateId(commentVoteID);
            if(validatedCommentVoteId === false){
                response = {
                    status: 400,
                    message: 'invalid comment-vote ID'
                }
            }else{
                findCommentVote = await commentVoteFindOne({_id: commentVoteID, user: findUser._id.toString()}, '_id');
                if(findCommentVote === null){
                    response = {
                        status: 404,
                        message: 'comment-vote not found'
                    }
                }else{
                    await commentVoteDeleteOne({_id: findCommentVote._id.toString()});
                    response = {
                        status: 200,
                        message: 'comment-vote deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deleteCommentVote;