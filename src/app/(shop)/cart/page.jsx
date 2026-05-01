'use client';
import { useCart } from '@/store/useCart';

export default function CartPage() {
  const { items, totalPrice } = useCart();
  return <main className="p-8"><h1 className="text-3xl mb-6">Cart</h1><p>{items.length} items</p><p>Total: Rp {totalPrice.toLocaleString('id-ID')}</p></main>;
}
