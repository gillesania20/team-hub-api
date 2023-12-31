import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne, teamUpdateOne } from './../../models/teams/teamQueries.js';
import { validateUsername, validateId, validateTeamName } from './../../functions/validation.js';
const updateTeam = async (req, res) => {
    const username = req.username;
    const teamID = req.params.teamID;
    const name = req.body.name;
    const validatedUsername = validateUsername(username);
    const update = {}
    let validatedId = false;
    let validatedTeamName = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findTeamWithSimilarName = null;
    let regex = null;
    let stringPattern = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized'
        }
    }else{
        findUser = await userFindOne({ username }, '_id');
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
                    if(typeof name !== 'undefined'){
                        validatedTeamName = validateTeamName(name);
                    }
                    if(typeof name !== 'undefined' && validatedTeamName === false){
                        response = {
                            status: 400,
                            message: 'invalid team name. letters, numbers, and underscore only. minimum 4 and maximum 20 characters'
                        }
                    }else{
                        if(typeof name !== 'undefined'){
                            stringPattern = `^${name}\$`;
                            regex = new RegExp(stringPattern, 'i');
                            findTeamWithSimilarName = await teamFindOne(
                                {name: {$regex: regex}, leader: findUser._id, _id: {$ne: findTeam._id}}, '_id');
                        }
                        if(typeof name !== 'undefined' && findTeamWithSimilarName !== null){
                            response = {
                                status: 400,
                                message: 'team name not available'
                            }
                        }else{
                            if(typeof name !== 'undefined'){
                                update.name = name;
                            }
                            await teamUpdateOne({_id: findTeam._id}, update);
                            response = {
                                status: 200,
                                message: 'updated team data'
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default updateTeam;