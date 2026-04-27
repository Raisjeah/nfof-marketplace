'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import ChatBox from '@/components/ai/ChatBox';
import { Zap } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Normally fetch by ID, but for this mock we'll fetch all and find
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setProduct(found);
      });
  }, [id]);

  if (!product) return <div className="h-screen flex items-center justify-center font-bold uppercase">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      <div className="pt-32 px-6 md:px-20 grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">{product.category}</span>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 leading-none">{product.name}</h1>
          <p className="text-2xl font-bold mb-8">$ {product.price}.00</p>

          <div className="p-6 bg-gray-50 rounded-3xl mb-8 border border-gray-100">
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Zap size={18} />
              <span className="font-bold uppercase text-xs">AI Recommendation</span>
            </div>
            <p className="text-sm text-gray-500 italic">"Gunakan asisten AI kami di bawah untuk mengetahui apakah item ini cocok dengan tinggi badan dan gaya kamu."</p>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">Add To Cart</Button>
            <Button variant="outline" onClick={() => setIsChatOpen(true)}>Ask AI</Button>
          </div>

          <div className="mt-12 space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest">Details</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{product.description || 'Exclusive NFOF drop. Limited quantities available.'}</p>
          </div>
        </div>
      </div>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <BottomNav
        activeTab="product"
        setActiveTab={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        isLoggedIn={false}
        onOpenLogin={() => {}}
      />
    </div>
  );
}
