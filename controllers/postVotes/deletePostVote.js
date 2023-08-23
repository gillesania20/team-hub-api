import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { postFindOne, postUpdateOne } from './../../models/posts/postQueries.js';
import { postVoteFindOne, postVoteDeleteOne, postVoteFind } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deletePostVote = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const postID = req.body.postID;
    const postVoteID = req.params.postVoteID;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedPostId = false;
    let validatedPostVoteId = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findPost = null;
    let findPostVote = null;
    let findPostVotes = null;
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
                findTeam = await teamFindOne({_id: teamID }, '_id');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found'   
                    }
                }else{
                    validatedPostId = validateId(postID);
                    if(validatedPostId === false){
                        response = {
                            status: 400,
                            message: 'invalid post ID'
                        }
                    }else{
                        findPost = await postFindOne({_id: postID}, '_id');
                        if(findPost === null){
                            response = {
                                status: 404,
                                message: 'post not found'
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
                                    findPostVotes = await postVoteFind({post: findPost._id}, 'vote');
                                    for(let i = 0; i < findPostVotes.length; i++){
                                        if(findPostVotes[i].vote === 1){
                                            likes++;
                                        }else if(findPostVotes[i].vote === -1){
                                            dislikes++;
                                        }
                                    }
                                    await postUpdateOne({_id: findPost._id}, {likes, dislikes});
                                    response = {
                                        status: 200,
                                        message: 'post-vote deleted'
                                    }
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
export default deletePostVote;