import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  height: { type: Number }, // User height in cm for AI sizing recommendations
  weight: { type: Number }, // User weight in kg for AI sizing recommendations
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
