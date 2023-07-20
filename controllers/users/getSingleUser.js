import { userFindOne } from './../../models/users/userQueries.js';
import { validateId } from './../../functions/validation.js';
const getSingleUser = async (req, res) => {
    const userID = req.params.userID;
    const validatedUserId = validateId(userID);
    let response = null;
    let findUser = null;
    if(validatedUserId === false){
        response = {
            status: 400,
            message: 'invalid user ID',
            user: null
        }
    }else{
        findUser = await userFindOne({_id: userID}, 'username active birthday');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                user: null
            }
        }else{
            response = {
                status: 200,
                message: 'user found',
                user: findUser
            }
        }
    }
    return res.status(response.status).json({message: response.message, user: response.user});
}
export default getSingleUser;