import mongoose from 'mongoose';
import User from './../users/User.js';
import Post from './../posts/Post.js';
import Team from './../teams/Team.js';
const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: Post, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
commentSchema.index({ user: 1, post: 1, created_at: 1 })
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;