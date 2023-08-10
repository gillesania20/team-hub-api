import express from 'express';
import pageNotFound from './../../controllers/errors/pageNotFound.js';
const router = express.Router();
router.all('/', pageNotFound);
export default router;