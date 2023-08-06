import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { postCreate } from './../../models/posts/postQueries.js';
import { validateUsername, validateId, validateBody } from './../../functions/validation.js';
const addPost = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const body = req.body.body;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedBody = false;
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
            validatedTeamId = validateId(teamID);
            if(validatedTeamId === false){
                response = {
                    status: 400,
                    message: 'invalid team ID'
                }
            }else{
                findTeam = await teamFindOne({_id: teamID});
                if(findTeam === null){
                    response = {
                        status: 404,
                        message: 'team not found'
                    }
                }else{
                    validatedBody = validateBody(body);
                    if(validatedBody === false){
                        response = {
                            status: 400,
                            message: 'invalid body. should start with any character followed by any character or white space. minimum 1 and maximum 500 characters'
                        }
                    }else{
                        await postCreate({body, user: findUser._id.toString(), team: findTeam._id.toString()});
                        response = {
                            status: 201,
                            message: 'post created'
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addPost;