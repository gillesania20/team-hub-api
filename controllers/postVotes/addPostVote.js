import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { postFindOne, postUpdateOne } from './../../models/posts/postQueries.js';
import { postVoteFindOne, postVoteCreate, postVoteFind } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId, validateVote } from './../../functions/validation.js';
const addPostVote = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const postID = req.body.postID;
    const vote = req.body.vote;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedPostId = false;
    let validatedVote = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findPost = null;
    let findPostVote = null;
    let findPostVotes= null;
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
                            findPostVote = await postVoteFindOne({user: findUser._id, post: findPost._id},
                                '_id');
                            if(findPostVote !== null){
                                response = {
                                    status: 400,
                                    message: 'post-vote already exist'
                                }
                            }else{
                                validatedVote = validateVote(vote);
                                if(validatedVote === false){
                                    response = {
                                        status: 400,
                                        message: 'invalid vote. should be a number. value should be 1 or -1 only'
                                    }
                                }else{
                                    await postVoteCreate(
                                        {user: findUser._id, post: findPost._id, team: findTeam._id, vote});
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
                                        status: 201,
                                        message: 'post-vote created'
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
export default addPostVote;