import { Zap, Search, ShoppingBag, MessageSquare, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenChat, isLoggedIn, onOpenLogin }) {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/70 backdrop-blur-2xl border border-gray-100 shadow-2xl rounded-full px-8 py-4 flex justify-between items-center z-[80]">
      <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-black' : 'text-gray-300'}>
        <Zap size={22} />
      </button>
      <button className="text-gray-300"><Search size={22} /></button>
      
      {/* Tombol AI Tengah */}
      <button onClick={onOpenChat} className="bg-black text-white p-5 rounded-full -mt-16 shadow-2xl hover:scale-110 transition-all">
        <MessageSquare size={24} />
      </button>

      <button className="text-gray-300"><ShoppingBag size={22} /></button>
      <button onClick={onOpenLogin} className={isLoggedIn ? 'text-blue-600' : 'text-black'}>
        <User size={22} />
      </button>
    </nav>
  );
}
