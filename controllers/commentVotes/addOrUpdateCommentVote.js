import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { commentFindOne, commentUpdateOne } from './../../models/comments/commentQueries.js';
import {
    commentVoteFindOne, commentVoteCreate, commentVoteUpdateOne, commentVoteFind
} from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId, validateVote } from './../../functions/validation.js';
const addOrUpdateCommentVote = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const commentID = req.body.commentID;
    const vote = req.body.vote;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedCommentId = false;
    let validatedVote = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
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
            validatedTeamId = validateId(teamID);
            if(validatedTeamId === false){
                response = {
                    status: 400,
                    message: 'invalid team ID'
                }
            }else{
                findTeam = await teamFindOne({_id: teamID}, '_id');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found'
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
                            validatedVote = validateVote(vote);
                            if(validatedVote === false){
                                response = {
                                    status: 400,
                                    message: 'invalid vote. should be a number. value should be 1 or -1 only'
                                }
                            }else{
                                findCommentVote = await commentVoteFindOne({user: findUser._id, comment: findComment._id}
                                    ,'_id');
                                if(findCommentVote === null){
                                    await commentVoteCreate(
                                        {vote, user: findUser._id, comment: findComment._id, team: findTeam._id});
                                }else{
                                    await commentVoteUpdateOne({_id: findCommentVote._id}, {vote});
                                }
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
                                    status: 201,
                                    message: 'comment-vote created or updated'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addOrUpdateCommentVote;