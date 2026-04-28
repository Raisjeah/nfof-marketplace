'use client';
import { useState, useEffect } from 'react';
import AICommandCenter from '@/components/ai/AICommandCenter';
import ProductFormModal from './ProductFormModal';
import { Plus } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();

    const handleRefresh = () => fetchProducts();
    window.addEventListener('refresh-data', handleRefresh);
    return () => window.removeEventListener('refresh-data', handleRefresh);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Inventory Management</h1>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            <Plus size={14} /> Add Product
          </button>
          <button onClick={fetchProducts} className="text-[10px] font-bold uppercase border-b border-black">Refresh Data</button>
        </div>
      </div>

      <AICommandCenter />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
      />

      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Product</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Category</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Price</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold uppercase text-xs">{p.name}</span>
                </td>
                <td className="px-8 py-6 text-xs text-gray-400 uppercase">{p.category}</td>
                <td className="px-8 py-6 font-bold text-xs">$ {p.price}</td>
                <td className="px-8 py-6 text-xs">
                  <span className={`px-3 py-1 rounded-full font-bold ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {p.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
