import { userFindOne } from './../../models/users/userQueries.js';
import { postFindOne } from './../../models/posts/postQueries.js';
import { postVoteFindOne, postVoteCreate } from './../../models/postVotes/postVoteQueries.js';
import { validateUsername, validateId, validateVote } from './../../functions/validation.js';
const addPostVote = async (req, res) => {
    const username = req.username;
    const postID = req.body.postID;
    const vote = req.body.vote;
    const validatedUsername = validateUsername(username);
    let validatedPostId = false;
    let validatedVote = false;
    let response = null;
    let findUser = null;
    let findPost = null;
    let findPostVote = null;
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
                    findPostVote = await postVoteFindOne({user: findUser._id.toString(), post: findPost._id.toString()},
                        '_id');
                    if(findPostVote !== null){
                        response = {
                            status: 400,
                            message: 'post-vote already exist'
                        }
                    }else{
                        validatedVote = validateVote(vote);
                        if(validatedVote === false){
                            response = {
                                status: 400,
                                message: 'invalid vote. should be a number. value should be 1 or -1 only'
                            }
                        }else{
                            await postVoteCreate(
                                {user: findUser._id.toString(), post: findPost._id.toString(), vote});
                            response = {
                                status: 201,
                                message: 'post-vote created'
                            }
                        }
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addPostVote;