import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './../../constants.js';
import { userFindOne, userCreate } from './../../models/users/userQueries.js';
import { validateUsername, validatePassword, validateBirthday } from './../../functions/validation.js';
const addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const birthday = req.body.birthday;
    const validatedUsername = validateUsername(username);
    const validatedPassword = validatePassword(password);
    const validatedBirthday = validateBirthday(birthday);
    let response = null;
    let findUser = null;
    let hashedPassword = null;
    if(validatedUsername === false){
        response = {
            status: 400,
            message: 'invalid username. letters and underscore only. minimum 4 and maximum 20 characters'
        }
    }else if(validatedPassword === false){
        response = {
            status: 400,
            message: 'invalid password. atleast one letter, number, and special character then minimum length is 8 and maximum is 20 characters'
        }
    }else if(validatedBirthday === false){
        // frontend code displays dd-mm-yyyy format
        response = {
            status: 400,
            message: 'invalid birthday. day-month-year, format: dd-mm-yyyy, 18 years old and above only'
        }
    }else{
        findUser = await userFindOne({username}, '_id');
        if(findUser !== null){
            response = {
                status: 400,
                message: 'username already taken'
            }
        }else{
            hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
            await userCreate({username, password: hashedPassword, birthday});
            response = {
                status: 201,
                message: 'user created'
            }
        }
    }
    return res.status(response.status).json({message: response.message});
}
export default addUser;