import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './../../constants.js';
import { userFind, userFindOne, userUpdateOne } from './../../models/users/userQueries.js';
import {
    validateId,
    validateUsername,
    validatePassword,
    validateBirthday
} from './../../functions/validation.js';
const updateUser = async (req, res) => {
    const userID = req.params.userID;
    const username = req.body.username;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const validatedId = validateId(userID);
    let validatedUsername = null;
    let validatedPassword = null;
    let validatedBirthday = null;
    let findUser = null;
    let response = null;
    let update = {}
    let hashedPassword = '';
    let findAllWithSimilarUsername = null;
    if(validatedId === false){
        response = {
            status: 400,
            message: 'invalid ID'
        }
    }else{
        findUser = await userFindOne({_id:userID}, '_id');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found'
            }
        }else{
            if(typeof username === 'string'){
                validatedUsername = validateUsername(username);
            }
            if(typeof password === 'string'){
                validatedPassword = validatePassword(password);
            }
            if(typeof birthday === 'string'){
                validatedBirthday = validateBirthday(birthday);
            }
            if(typeof username === 'string' && validatedUsername === false){
                response = {
                    status: 400,
                    message: 'invalid username. letters a-Z and underscore. minimum 4 characters and maximum 20 characters'
                }
            }else if(typeof password === 'string' && validatedPassword === false){
                response = {
                    status: 400,
                    message: 'invalid password. atleast one letter,number, and special character then minimum length is 8 and maximum is 20'
                }
            }else if(typeof birthday === 'string' && validatedBirthday === false){
                // frontend code displays dd-mm-yyyy format
                response = {
                    status: 400,
                    message: 'invalid birthday. day-month-year, format: dd-mm-yyyy, 18 years old and above only'
                }
            }else{
                if(typeof username === 'string'){
                    findAllWithSimilarUsername = await userFind({username, _id: {$ne: findUser._id}});
                }
                if(typeof username === 'string' && findAllWithSimilarUsername.length > 0){
                    response = {
                        status: 400,
                        message: 'username already taken'
                    }
                }else{
                    if(typeof username === 'string'){
                        update.username = username;
                    }
                    if(typeof password === 'string'){
                        hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
                        update.password = hashedPassword;
                    }
                    if(typeof birthday === 'string'){
                        update.birthday = birthday;
                    }
                    await userUpdateOne({_id: userID}, update);
                    response = {
                        status: 200,
                        message: 'updated user data'
                    }
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default updateUser;