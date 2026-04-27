'use client';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  // Simple mock cart
  const cartItems = [];

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      <div className="pt-32 px-6 md:px-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="opacity-30 uppercase font-bold tracking-widest mb-8">Cart is empty</p>
            <Button onClick={() => window.location.href = '/catalog'}>Browse Catalog</Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cart item mapping would go here */}
            <div className="pt-8 border-t flex justify-between items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Total</p>
                <p className="text-4xl font-black">$ 0.00</p>
              </div>
              <Button>Checkout</Button>
            </div>
          </div>
        )}
      </div>

      <BottomNav
        activeTab="cart"
        setActiveTab={() => {}}
        onOpenChat={() => {}}
        isLoggedIn={false}
        onOpenLogin={() => {}}
      />
    </div>
  );
}
