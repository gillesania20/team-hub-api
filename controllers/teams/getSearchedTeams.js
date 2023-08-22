import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindAndPopulate } from './../../models/teams/teamQueries.js';
import { validateUsername, validateTeamName } from './../../functions/validation.js';
const getSearchedTeams = async (req, res) => {
    const username = req.username;
    const teamName = req.body.teamName;
    const validatedUsername = validateUsername(username);
    let validatedTeamName = false;
    let findUser = null;
    let findTeams = null;
    let response = null;
    let regex = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            teams: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                teams: null
            }
        }else{
            validatedTeamName = validateTeamName(teamName);
            if(validatedTeamName === false){
                response = {
                    status: 400,
                    message: 'invalid team name. letters, numbers, and underscore only. minimum 4 and maximum 20 characters',
                    teams: null
                }
            }else{
                regex = new RegExp("^"+teamName, "i");
                findTeams = await teamFindAndPopulate({name: {$regex: regex}}, 'name leader');
                if(findTeams.length <= 0){
                    response = {
                        status: 404,
                        message: 'team not found',
                        teams: []
                    }
                }else{
                    response = {
                        status: 200,
                        message: 'teams found',
                        teams: findTeams
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, teams: response.teams});
}
export default getSearchedTeams;