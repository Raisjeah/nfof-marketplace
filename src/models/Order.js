import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true, min: 1 }, price: { type: Number, required: true, min: 0 } }],
    totalPrice: { type: Number, required: true, min: 0 },
    paymentMethod: { type: String, enum: ['COD', 'Transfer'], required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Shipped'], default: 'Pending' },
    paymentProofImage: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
