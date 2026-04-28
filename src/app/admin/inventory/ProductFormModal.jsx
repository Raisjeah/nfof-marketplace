'use client';
import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProductFormModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    sizes: 'S,M,L,XL',
    image: ''
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);

    setLoading(true);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.url) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        alert(`Upload failed: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Upload failed: Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        sizes: formData.sizes.split(',').map(s => s.trim()),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        onSuccess();
        onClose();
        setFormData({ name: '', price: '', stock: '', category: '', description: '', sizes: 'S,M,L,XL', image: '' });
      }
    } catch (err) {
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-6 top-6 opacity-50"><X /></button>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-6">New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Product Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
              className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm"
            />
            <input
              placeholder="Category (e.g. Tees)"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
              className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price ($)"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              required
              className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={e => setFormData({...formData, stock: e.target.value})}
              required
              className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm"
            />
          </div>

          <input
            placeholder="Sizes (comma separated: S,M,L)"
            value={formData.sizes}
            onChange={e => setFormData({...formData, sizes: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 bg-gray-50 rounded-xl outline-none border focus:border-black text-sm h-24 resize-none"
          />

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Product Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-dashed border-gray-300 relative">
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover" />
                ) : (
                  <Upload size={20} className="text-gray-300" />
                )}
                <input
                  type="file"
                  onChange={handleUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              <p className="text-[10px] text-gray-400">Click to upload image to Cloudinary</p>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? 'Processing...' : 'Save Product'}
          </Button>
        </form>
      </div>
    </div>
  );
}
