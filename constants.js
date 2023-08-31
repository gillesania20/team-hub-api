const SALT_ROUNDS = 10;
const COOKIE_HTTP_ONLY = true;
const COOKIE_SECURE = (process.env.NODE_ENV === 'production')?true:false;
const COOKIE_SAME_SITE = (process.env.NODE_ENV === 'production')?'None':false;
const COOKIE_MAX_AGE = (process.env.NODE_ENV === 'production')?(1000*60*60*24):(1000*60*30);
const ACCESS_TOKEN_EXPIRES_IN = (process.env.NODE_ENV === 'production')?5:5;
const REFRESH_TOKEN_EXPIRES_IN = (process.env.NODE_ENV === 'production')?'24h':'1h';
export {
    SALT_ROUNDS,
    COOKIE_HTTP_ONLY,
    COOKIE_SECURE,
    COOKIE_SAME_SITE,
    COOKIE_MAX_AGE,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
}