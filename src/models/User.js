import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  height: { type: Number }, // For AI recommendations
  weight: { type: Number }, // For AI recommendations
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
