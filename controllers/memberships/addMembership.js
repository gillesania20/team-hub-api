import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { membershipFindOne, membershipCreate } from './../../models/memberships/membershipQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const addMembership = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findMembership = null;
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
                    findMembership = await membershipFindOne({user: findUser._id.toString(), team: findTeam._id.toString()},
                        '_id');
                    if(findMembership !== null){
                        response = {
                            status: 400,
                            message: 'membership already exist'
                        }
                    }else{
                        await membershipCreate({user: findUser._id.toString(), team: findTeam._id.toString()});
                        response ={
                            status: 201,
                            message: 'membership created'
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addMembership;