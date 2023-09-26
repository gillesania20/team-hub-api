import { COOKIE_HTTP_ONLY, COOKIE_SECURE, COOKIE_SAME_SITE } from './../../constants.js';
const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE
    });
    return res.status(200).json({message: 'logout successful'});
}
export default logout;