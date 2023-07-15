import mongoose from 'mongoose';
import User from './../users/User.js';
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: User },
    members: { type: [
        { type: mongoose.Schema.Types.ObjectId, ref: User }
    ], default: [] }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
teamSchema.index({ name: 1, leader: 1}, { unique: true });
const Team = mongoose.model('Team', teamSchema);
export default Team;