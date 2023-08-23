import mongoose from 'mongoose';
import User from './../users/User.js';
import Team from './../teams/Team.js';
const postSchema = new mongoose.Schema({
    body: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
postSchema.index({ user: 1, team: 1, created_at: 1 });
const Post = mongoose.model('Post', postSchema);
export default Post;