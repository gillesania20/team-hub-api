import express from 'express';
import getCookie from './../../controllers/cookieChecker/getCookie.js';
import setCookie from './../../controllers/cookieChecker/setCookie.js';
const router = express.Router();
router.get('/', getCookie);
router.post('/', setCookie);
export default router;