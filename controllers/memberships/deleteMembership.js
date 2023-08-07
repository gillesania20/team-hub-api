import { userFindOne } from './../../models/users/userQueries.js';
import { membershipFindOne, membershipDeleteOne } from './../../models/memberships/membershipQueries.js';
import { validateUsername, validateId } from './../../functions/validation.js';
const deleteMembership = async (req, res) => {
    const username = req.username;
    const membershipID = req.params.membershipID;
    const validatedUsername = validateUsername(username);
    let validatedMembershipId = false;
    let response = null;
    let findUser = null;
    let findMembership = null;
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
            validatedMembershipId = validateId(membershipID);
            if(validatedMembershipId === false){
                response = {
                    status: 400,
                    message: 'invalid membership ID'
                }
            }else{
                findMembership = await membershipFindOne({_id: membershipID, user: findUser._id.toString()}, '_id');
                if(findMembership === null){
                    response = {
                        status: 404,
                        message: 'membership not found'
                    }
                }else{
                    await membershipDeleteOne({_id: findMembership._id.toString()});
                    response = {
                        status: 200,
                        message: 'membership deleted'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default deleteMembership;