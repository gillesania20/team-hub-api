import { COOKIE_HTTP_ONLY, COOKIE_SECURE, COOKIE_SAME_SITE, COOKIE_MAX_AGE } from './../../constants.js';
const setCookie = (req, res) => {
    res.cookie('acceptsCookies', true, {
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAME_SITE,
        maxAge: COOKIE_MAX_AGE
    });
    return res.status(200).json({message: 'cookie created'});
}
export default setCookie;