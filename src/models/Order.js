import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      size: String,
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
