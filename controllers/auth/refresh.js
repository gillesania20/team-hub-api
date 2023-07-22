import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRES_IN } from './../../constants.js';
import { userFindOne } from './../../models/users/userQueries.js';
const refresh = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    let decoded = null;
    let findUser = null;
    let response = null;
    let accessToken = null;
    if(typeof refreshToken === 'undefined'){
        response = {
            status: 404,
            message: 'no refreshToken cookie',
            accessToken: null,
            userID: null
        }
    }else{
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        findUser = await userFindOne({username: decoded.username}, '_id username');
        if(findUser === null){
            response = {
                status: 404,
                message: 'user not found',
                accessToken: null,
                userID: null
            }
        }else{
            accessToken = jwt.sign({ username: findUser.username }, process.env.ACCESS_TOKEN_KEY,
                { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
            response = {
                status: 200,
                message: 'refresh successful',
                accessToken,
                userID: findUser._id.toString()
            }
        }
    }
    return res.status(response.status).json({
        message: response.message,
        accessToken: response.accessToken,
        userID: response.userID
    });
}
export default refresh;