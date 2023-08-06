import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne, teamCreate } from './../../models/teams/teamQueries.js';
import { validateUsername, validateTeamName } from './../../functions/validation.js';
const addTeam = async (req, res) => {
    const username = req.username;
    const name = req.body.name;
    const validatedUsername = validateUsername(username);
    let validatedTeamName = false;
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
                message: 'user not found'
            }
        }else{
            validatedTeamName = validateTeamName(name);
            if(validatedTeamName === false){
                response = {
                    status: 400,
                    message: 'invalid team name. letters, numbers, and underscore only. minimum 4 and maximum 20 characters'
                }
            }else{
                findTeam = await teamFindOne({name, leader: findUser._id.toString()}, '_id');
                if(findTeam !== null){
                    response = {
                        status: 400,
                        message: 'team name not available'
                    }
                }else{
                    await teamCreate({name, leader: findUser._id.toString()});
                    response = {
                        status: 201,
                        message: 'team created'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addTeam;