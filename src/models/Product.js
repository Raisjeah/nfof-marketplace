import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String },
  brand: { type: String, default: 'NFOF' },
  image: { type: String },
  description: { type: String },
  sizes: [String],
  tags: [String],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
