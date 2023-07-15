import express from 'express';
import Comment from './models/comments/Comment.js';
import Post from './models/posts/Post.js';
import Team from './models/teams/Team.js';
import User from './models/users/User.js';
const PORT = process.env.PORT || 3500;
const app = express();
app.listen(PORT, ()=> console.log(`listening to port: ${PORT}`));