import { userFindOne } from './../../models/users/userQueries.js';
import { commentFindOne, commentUpdateOne } from './../../models/comments/commentQueries.js';
import { commentVoteFindOne, commentVoteDeleteOne, commentVoteFind } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteCommentVote = async (req, res) => {
    const username = req.username;
    const commentID = req.body.commentID;
    const commentVoteID = req.params.commentVoteID;
    const validatedUsername = validateUsername(username);
    let validatedCommentId = false;
    let validatedCommentVoteId = false;
    let response = null;
    let findUser = null;
    let findComment = null;
    let findCommentVote = null;
    let findCommentVotes = null;
    let likes = 0;
    let dislikes = 0;
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
                            findCommentVotes = await commentVoteFind({comment: findComment._id}, 'vote');
                            for(let i = 0; i < findCommentVotes.length; i++){
                                if(findCommentVotes[i].vote === 1){
                                    likes++;
                                }else if(findCommentVotes[i].vote === -1){
                                    dislikes++;
                                }
                            }
                            await commentUpdateOne({_id: findComment._id}, {likes, dislikes});
                            response = {
                                status: 200,
                                message: 'comment-vote deleted'
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deleteCommentVote;