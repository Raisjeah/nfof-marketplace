'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/ui/ProductCard';
import ChatBox from '@/components/ai/ChatBox';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      <div className="pt-32 px-6 md:px-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter italic">Collections</h2>
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">{products.length} Items</span>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center opacity-30 uppercase font-bold tracking-widest">No items found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={() => alert('Added to cart')} />
            ))}
          </div>
        )}
      </div>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <BottomNav
        activeTab="catalog"
        setActiveTab={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        isLoggedIn={false}
        onOpenLogin={() => {}}
      />
    </div>
  );
}
