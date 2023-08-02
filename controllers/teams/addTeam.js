import jwt from 'jsonwebtoken';
import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne, teamCreate } from './../../models/teams/teamQueries.js';
import { validateBearerToken, validateTeamName } from './../../functions/validation.js';
const addTeam = async (req, res) => {
    const bearerToken = req.headers.authorization;
    const name = req.body.name;
    const validatedBearerToken = validateBearerToken(bearerToken);
    let validatedTeamName = false;
    let response = null;
    let accessToken = null;
    let decoded = null;
    let findUser = null;
    let findTeam = null;
    if(validatedBearerToken === false){
        response = {
            status: 400,
            message: 'invalid token'
        }
    }else{
        accessToken = bearerToken.split(" ")[1];
        decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        findUser = await userFindOne({username: decoded.username}, '_id');
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
                    message: 'invalid team name'
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