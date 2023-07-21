import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    COOKIE_HTTP_ONLY,
    COOKIE_MAX_AGE,
    COOKIE_SAME_SITE,
    COOKIE_SECURE,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
} from './../../constants.js';
import { userFindOne } from './../../models/users/userQueries.js';
import { validateUsername, validatePassword } from './../../functions/validation.js';
const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const validatedUsername = validateUsername(username);
    const validatedPassword = validatePassword(password);
    let response = null;
    let findUser = null;
    let comparePassword = false;
    let accessToken = null;
    let refreshToken = null;
    if(validatedUsername === false){
        response = {
            status: 400,
            message: 'invalid username',
            accessToken: null
        }
    }else if(validatedPassword === false){
        response = {
            status: 400,
            message: 'invalid password',
            accessToken: null
        }
    }else{
        findUser = await userFindOne({username}, 'username password');
        if(findUser === null){
            response = {
                status: 400,
                message: 'invalid username or password',
                accessToken: null
            }
        }else{
            comparePassword = bcrypt.compareSync(password, findUser.password);
            if(comparePassword === false){
                response = {
                    status: 400,
                    message: 'invalid username or password',
                    accessToken: null
                }
            }else{
                accessToken = jwt.sign({username}, process.env.ACCESS_TOKEN_KEY,
                    { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
                refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_KEY,
                    { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
                res.cookie('jwt', refreshToken, {
                    httpOnly: COOKIE_HTTP_ONLY,
                    secure: COOKIE_SECURE,
                    sameSite: COOKIE_SAME_SITE,
                    maxAge: COOKIE_MAX_AGE
                })
                response = {
                    status: 200,
                    message: 'successful login',
                    accessToken
                }
            }
        }
    }
    return res.status(response.status).json({message: response.message, accessToken: response.accessToken});
}
export default login;   