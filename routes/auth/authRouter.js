import express from 'express';
import login from './../../controllers/auth/login.js';
import logout from './../../controllers/auth/logout.js';
import refresh from './../../controllers/auth/refresh.js';
const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);
export default router;