'use client';
import { useState, useEffect } from 'react';
import AICommandCenter from '@/components/ai/AICommandCenter';
import { Plus, X, Package, Tag, DollarSign, Layers, Type, List } from 'lucide-react';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    sizes: '',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop' // Default placeholder
  });

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

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s !== '')
        }),
      });
      if (res.ok) {
        alert('Product uploaded successfully!');
        setFormData({ name: '', price: '', stock: '', category: '', description: '', sizes: '', image: formData.image });
        setShowAddForm(false);
        fetchProducts();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      alert('Failed to upload product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Inventory Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <Plus size={16} /> Add Product
          </button>
          <button onClick={fetchProducts} className="text-[10px] font-bold uppercase border-b border-black">Refresh Data</button>
        </div>
      </div>

      <AICommandCenter />

      {showAddForm && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddForm(false)} className="absolute right-8 top-8 opacity-40 hover:opacity-100 transition-opacity"><X /></button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center"><Package size={24} /></div>
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tight">Upload New Product</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Add to NFOF Collection</p>
              </div>
            </div>

            <form onSubmit={handleUpload} className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Product Name</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Resilience Oversized Hoodie"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Category</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold appearance-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Tees">Tees</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Pants">Pants</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="99"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Stock</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    type="number"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                    placeholder="50"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Sizes (Comma separated)</label>
                <div className="relative">
                  <List className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    value={formData.sizes}
                    onChange={e => setFormData({...formData, sizes: e.target.value})}
                    placeholder="S, M, L, XL"
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold"
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Tell us about the product..."
                  rows={3}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-black transition-all text-sm font-bold resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="col-span-2 mt-4 bg-black text-white py-5 rounded-[1.5rem] font-black uppercase italic tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Upload Product'}
              </button>
            </form>
          </div>
        </div>
      )}

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
