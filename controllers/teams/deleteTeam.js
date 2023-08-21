import mongoose from 'mongoose';
import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne, teamDeleteOne } from './../../models/teams/teamQueries.js';
import { membershipDeleteMany } from './../../models/memberships/membershipQueries.js';
import { postDeleteMany } from './../../models/posts/postQueries.js';
import { postVoteDeleteMany } from './../../models/postVotes/postVoteQueries.js';
import { commentDeleteMany } from './../../models/comments/commentQueries.js';
import { commentVoteDeleteMany } from './../../models/commentVotes/commentVoteQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteTeam = async (req, res) => {
    const username = req.username;
    const teamID = req.params.teamID;
    const validatedUsername = validateUsername(username);
    let validatedId = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let session = null;
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
                message: 'username not found'
            }
        }else{
            validatedId = validateId(teamID);
            if(validatedId === false){
                response = {
                    status: 400,
                    message: 'invalid team ID'
                }
            }else{
                findTeam = await teamFindOne({_id: teamID, leader: findUser._id}, '_id');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found'
                    }
                }else{
                    session = await mongoose.startSession();
                    session.startTransaction();
                    await teamDeleteOne({_id: findTeam._id}, {session});
                    await membershipDeleteMany({team: findTeam._id}, {session});
                    await postDeleteMany({team: findTeam._id}, {session});
                    await postVoteDeleteMany({team: findTeam._id}, {session});
                    await commentDeleteMany({team: findTeam._id}, {session});
                    await commentVoteDeleteMany({team: findTeam._id}, {session});
                    await session.commitTransaction();
                    session.endSession();
                    response = {
                        status: 200,
                        message: 'team deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deleteTeam;