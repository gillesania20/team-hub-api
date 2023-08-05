import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne, teamDeleteOne } from './../../models/teams/teamQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteTeam = async (req, res) => {
    const username = req.username;
    const teamID = req.params.teamID;
    const validatedUsername = validateUsername(username);
    let validatedId = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
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
                findTeam = await teamFindOne({_id: teamID, leader: findUser._id.toString()}, '_id');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found'
                    }
                }else{
                    await teamDeleteOne({_id: findTeam._id.toString()});
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