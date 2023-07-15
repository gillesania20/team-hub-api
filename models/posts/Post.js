import mongoose from 'mongoose';
import User from './../users/User.js';
import Team from './../teams/Team.js';
const postSchema = new mongoose.Schema({
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team },
    like: { type: [{
        type: mongoose.Schema.Types.ObjectId, ref: User
    }], default: [] },
    dislike: { type: [{
        type: mongoose.Schema.Types.ObjectId, ref: User
    }], default: [] }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const Post = mongoose.model('Post', postSchema);
export default Post;