'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/ui/ProductCard';
import ChatBox from '@/components/ai/ChatBox';
import ModalLogin from '@/components/ui/ModalLogin';
import { CheckCircle2, X } from 'lucide-react';

function CatalogContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['All', 'Tees', 'Hoodies', 'Outerwear', 'Pants', 'Accessories'];

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      setShowSuccess(true);
      // Remove the query param from URL without refreshing
      window.history.replaceState({}, '', '/catalog');
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category?.toLowerCase() === category.toLowerCase()));
    }
  }, [category, products]);

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />

      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl animate-bounce">
          <CheckCircle2 className="text-green-400" size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">Login Berhasil! Selamat Belanja, King.</span>
          <button onClick={() => setShowSuccess(false)}><X size={14} /></button>
        </div>
      )}

      <div className="pt-32 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Collections</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                    category === cat ? 'bg-black text-white border-black' : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">{filteredProducts.length} Items</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center opacity-30 uppercase font-bold tracking-widest">No items found in {category}.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} onAddToCart={() => alert('Added to cart')} />
            ))}
          </div>
        )}
      </div>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <BottomNav
        activeTab="catalog"
        setActiveTab={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        isLoggedIn={!!session}
        onOpenLogin={() => setShowLogin(true)}
      />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-bold uppercase tracking-widest animate-pulse">Loading Collections...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
