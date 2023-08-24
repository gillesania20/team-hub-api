import { userFindOne } from './../../models/users/userQueries.js';
import { commentVoteFindOne } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSingleCommentVote = async (req, res) => {
    const username = req.username;
    const commentVoteID = req.params.commentVoteID;
    const validatedUsername = validateUsername(username);
    let validatedCommentVoteId = false;
    let findUser = null;
    let findCommentVote = null;
    let response = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            commentVote: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                commentVote: null
            }
        }else{
            validatedCommentVoteId = validateId(commentVoteID);
            if(validatedCommentVoteId === false){
                response = {
                    status: 400,
                    message: 'invalid comment-vote ID',
                    commentVote: null
                }
            }else{
                findCommentVote = await commentVoteFindOne({_id: commentVoteID}, '_id vote');
                if(findCommentVote === null){
                    response = {
                        status: 404,
                        message: 'comment-vote not found',
                        commentVote: null
                    }
                }else{
                    response = {
                        status: 200,
                        message: 'comment-vote found',
                        commentVote: findCommentVote
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, commentVote: response.commentVote});
}
export default getSingleCommentVote;