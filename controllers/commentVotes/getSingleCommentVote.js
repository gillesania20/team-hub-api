import { userFindOne } from './../../models/users/userQueries.js';
import { commentVoteFindOne } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSingleCommentVote = async (req, res) => {
    const username = req.username;
    const commentID = req.params.commentID;
    const validatedUsername = validateUsername(username);
    let validatedCommentId = false;
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
            validatedCommentId = validateId(commentID);
            if(validatedCommentId === false){
                response = {
                    status: 400,
                    message: 'invalid comment ID',
                    commentVote: null
                }
            }else{
                findCommentVote = await commentVoteFindOne({user: findUser._id, comment: commentID}, '_id vote');
                if(findCommentVote === null){
                    response = {
                        status: 200,
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