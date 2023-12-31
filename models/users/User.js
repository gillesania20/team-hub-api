import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    birthday: { type: Date, required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
userSchema.index({ username: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);
export default User;