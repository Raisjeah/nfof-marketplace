'use client';
import { useState, useEffect } from 'react';
import AICommandCenter from '@/components/ai/AICommandCenter';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    const handleRefresh = () => fetchOrders();
    window.addEventListener('refresh-data', handleRefresh);
    return () => window.removeEventListener('refresh-data', handleRefresh);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Order Management</h1>
        <button onClick={fetchOrders} className="text-[10px] font-bold uppercase border-b border-black">Refresh Data</button>
      </div>

      <AICommandCenter />

      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Order ID</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Customer</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Total</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
               <tr><td colSpan="4" className="px-8 py-12 text-center text-xs font-bold animate-pulse">Fetching Orders...</td></tr>
            ) : orders.length === 0 ? (
               <tr><td colSpan="4" className="px-8 py-12 text-center text-xs text-gray-400">No orders found.</td></tr>
            ) : (
              orders.map(o => (
                <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6 font-mono text-[10px]">{o._id}</td>
                  <td className="px-8 py-6 text-xs uppercase font-bold">{o.user?.name || 'Guest'}</td>
                  <td className="px-8 py-6 font-bold text-xs">$ {o.totalAmount}</td>
                  <td className="px-8 py-6 text-xs">
                    <span className={`px-3 py-1 rounded-full font-bold uppercase text-[9px] tracking-widest ${
                      o.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      o.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                      o.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
