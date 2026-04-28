'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/ui/ProductCard';
import ChatBox from '@/components/ai/ChatBox';

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categories = ['All', 'Tees', 'Hoodies', 'Outerwear', 'Pants', 'Accessories'];

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
