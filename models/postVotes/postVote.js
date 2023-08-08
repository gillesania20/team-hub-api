import mongoose from 'mongoose';
import Post from './../posts/Post.js';
import User from './../users/User.js';
const postVoteSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: Post, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    vote: { type: Number, required: true}
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
postVoteSchema.index({ post: 1, user: 1 }, { unique: true });
const PostVote = mongoose.model('postVote', postVoteSchema);
export default PostVote;