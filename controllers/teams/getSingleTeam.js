import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const getSingleTeam = async (req, res) => {
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
            message: 'not authorized',
            team: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'username not found',
                team: null
            }
        }else{
            validatedId = validateId(teamID);
            if(validatedId === false){
                response = {
                    status: 400,
                    message: 'invalid team ID',
                    team: null
                }
            }else{
                findTeam = await teamFindOne({_id: teamID, leader: findUser._id.toString()},
                    '_id name leader created_at');
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found',
                        team: null
                    }
                }else{
                    response = {
                        status: 200,
                        message: 'team found',
                        team: findTeam
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, team: response.team});
}
export default getSingleTeam;