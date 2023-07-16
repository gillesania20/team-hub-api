import express from 'express';
import authRouter from './routes/auth/authRouter.js';
import userRouter from './routes/users/userRouter.js';
import teamRouter from './routes/teams/teamRouter.js';
import postRouter from './routes/posts/postRouter.js';
import commentRouter from './routes/comments/commentRouter.js';
const app = express();
const PORT = process.env.PORT || 3500;
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.listen(PORT, ()=> console.log(`listening to port: ${PORT}`));