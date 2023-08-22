import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { membershipFindOne } from './../../models/memberships/membershipQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSingleMembership = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let findUser = null;
    let findTeam = null;
    let findMembership = null;
    let response = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            membership: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                membership: null
            }
        }else{
            validatedTeamId = validateId(teamID);
            if(validatedTeamId === false){
                response = {
                    status: 400,
                    message: 'invalid team ID',
                    membership: null
                }
            }else{
                findTeam = await teamFindOne({_id: teamID}, '_id');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found',
                        membership: null
                    }
                }else{
                    findMembership = await membershipFindOne({user: findUser._id, team: findTeam._id}, '_id');
                    if(findMembership === null){
                        response = {
                            status: 404,
                            message: 'membership not found',
                            membership: null
                        }
                    }else{
                        response = {
                            status: 200,
                            message: 'membership found',
                            membership: findMembership
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, membership: response.membership});
}
export default getSingleMembership;