import { userFindOne } from './../../models/users/userQueries.js';
import { membershipFindOne } from './../../models/memberships/membershipQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getCheckMembership = async (req, res) => {
    const username = req.username;
    const userID = req.params.userID;
    const teamID = req.params.teamID;
    const validatedUsername = validateUsername(username);
    let validatedUserId = false;
    let validatedTeamId = false;
    let findUser = null;
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
            validatedUserId = validateId(userID);
            if(validatedUserId === false){
                response = {
                    status: 400,
                    message: 'invalid user ID',
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
                    findMembership = await membershipFindOne({user: userID, team: teamID}, '_id');
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
export default getCheckMembership;