import mongoose from 'mongoose';
import User from './../users/User.js';
import Team from './../teams/Team.js';
const membershipSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: Team, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
membershipSchema.index({ user: 1, team: 1 }, { unique: true });
const Membership = mongoose.model('Membership', membershipSchema);
export default Membership;