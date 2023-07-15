import mongoose from 'mongoose';
import User from './../users/User.js';
import Post from './../posts/Post.js';
const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    post: { type: mongoose.Schema.Types.ObjectId, ref: Post },
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
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;