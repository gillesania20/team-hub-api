import { userFindOne } from './../../models/users/userQueries.js';
import { teamFindOne } from './../../models/teams/teamQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { commentCreate } from './../../models/comments/commentQueries.js';
import { validateUsername, validateId, validateBody } from './../../functions/validation.js';
const addComment = async (req, res) => {
    const username = req.username;
    const teamID = req.body.teamID;
    const postID = req.body.postID;
    const body = req.body.body;
    const validatedUsername = validateUsername(username);
    let validatedTeamId = false;
    let validatedPostId = false;
    let validatedBody = false;
    let response = null;
    let findUser = null;
    let findTeam = null;
    let findPost = null;
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
                        findPost = await postFindOne({_id: postID}, '_id');
                        if(findPost === null){
                            response = {
                                status: 404,
                                message: 'post not found'
                            }
                        }else{
                            validatedBody = validateBody(body);
                            if(validatedBody === false){
                                response = {
                                    status: 400,
                                    message: 'invalid body. should start with any character followed by any character or white space. minimum 1 and maximum 500 characters'
                                }
                            }else{
                                await commentCreate({body, user: findUser._id, post: findPost._id, team: findTeam._id});
                                response = {
                                    status: 201,
                                    message: 'comment created'
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
export default addComment;