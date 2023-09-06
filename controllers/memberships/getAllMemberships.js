import { userFindOne } from './../../models/users/userQueries.js';
import { membershipFindAndPopulate } from './../../models/memberships/membershipQueries.js';
import { validateUsername } from './../../functions/validation.js';
const getAllMemberships = async (req, res) => {
    const username = req.username;
    const validatedUsername = validateUsername(username);
    let findUser = null;
    let findMemberships = null;
    let response = null;
    if(validatedUsername === false){
        response = {
            status: 401,
            message: 'not authorized',
            memberships: null
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                memberships: null
            }
        }else{
            findMemberships = await membershipFindAndPopulate({user: findUser._id}, 'user team');
            if(findMemberships.length <= 0){
                response = {
                    status: 404,
                    message: 'memberships not found',
                    memberships: []
                }
            }else{
                response = {
                    status: 200,
                    message: 'memberships found',
                    memberships: findMemberships
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, memberships: response.memberships});
}
export default getAllMemberships;