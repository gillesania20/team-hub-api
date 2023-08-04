import jwt from 'jsonwebtoken';
import { validateBearerToken } from './../functions/validation.js';
const verifyJWT = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    let validatedBearerToken = validateBearerToken(bearerToken);
    let response = null;
    let accessToken = null;
    let decoded = null;
    if(validatedBearerToken === false){
        response = {
            status: 401,
            message: 'not authorized'
        }
    }else{
        accessToken = bearerToken.split(" ")[1];
        decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        req.username = decoded.username;
        return next();
    }
    return res.status(response.status).json({message: response.message});
}
export default verifyJWT;