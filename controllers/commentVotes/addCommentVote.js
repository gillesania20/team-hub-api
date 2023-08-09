import { userFindOne } from './../../models/users/userQueries.js';
import { commentFindOne } from './../../models/comments/commentQueries.js';
import { commentVoteFindOne, commentVoteCreate } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId, validateVote } from './../../functions/validation.js';
const addCommentVote = async (req, res) => {
    const username = req.username;
    const commentID = req.body.commentID;
    const vote = req.body.vote;
    const validatedUsername = validateUsername(username);
    let validatedCommentId = false;
    let validatedVote = false;
    let response = null;
    let findUser = null;
    let findComment = null;
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
            validatedCommentId = validateId(commentID);
            if(validatedCommentId === false){
                response = {
                    status: 400,
                    message: 'invalid comment ID'
                }
            }else{
                findComment = await commentFindOne({_id: commentID}, '_id');
                if(findComment === null){
                    response = {
                        status: 404,
                        message: 'comment not found'
                    }
                }else{
                    findCommentVote = await commentVoteFindOne({user: findUser._id.toString(), comment: findComment._id.toString()}
                        ,'_id');
                    if(findCommentVote !== null){
                        response = {
                            status: 400,
                            message: 'comment-vote already exist'
                        }
                    }else{
                        validatedVote = validateVote(vote);
                        if(validatedVote === false){
                            response = {
                                status: 400,
                                message: 'invalid vote. should be a number. value should be 1 or -1 only'
                            }
                        }else{
                            await commentVoteCreate(
                                {vote, user: findUser._id.toString(), comment: findComment._id.toString()});
                            response = {
                                status: 201,
                                message: 'comment-vote created'
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addCommentVote;