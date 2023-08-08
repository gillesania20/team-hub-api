import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { postFindOne, postUpdateOne } from './../../models/posts/postQueries.js';
import { validateUsername, validateId, validateBody } from './../../functions/validation.js';
const updatePost = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const postID = req.params.postID;
    const body = req.body.body;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedPostId = false;
    let validatedBody = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findPost = null;
    let update = {}
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
                    validatedPostId = validateId(postID);
                    if(validatedPostId === false){
                        response = {
                            status: 400,
                            message: 'invalid post ID'
                        }
                    }else{
                        findPost = await postFindOne({_id: postID, user: findUser._id.toString(), team: findTeam._id.toString()},
                            '_id');
                        if(findPost === null){
                            response = {
                                status: 404,
                                message: 'post not found'
                            }
                        }else{
                            if(typeof body !== 'undefined'){
                                validatedBody = validateBody(body);
                            }
                            if(typeof body !== 'undefined' && validatedBody === false){
                                response = {
                                    status: 400,
                                    message: 'invalid body. should start with any character followed by any character or white space. minimum 1 and maximum 500 characters'
                                }
                            }else{
                                if(typeof body !== 'undefined'){
                                    update.body = body;
                                }
                                await postUpdateOne({_id: findPost._id.toString()}, update);
                                response = {
                                    status: 200,
                                    message: 'updated post data'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default updatePost;