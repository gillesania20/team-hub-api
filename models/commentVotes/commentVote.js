import mongoose from 'mongoose';
import Comment from './../comments/Comment.js';
import User from './../users/User.js';
import Team from './../teams/Team.js';
const commentVoteSchema = new mongoose.Schema({
    comment: { type: mongoose.Schema.Types.ObjectId, ref: Comment, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true },
    vote: { type: Number, enum: [ 1, -1 ], required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
commentVoteSchema.index({ comment: 1, user: 1 }, { unique: true });
const CommentVote = mongoose.model('CommentVote', commentVoteSchema);
export default CommentVote;