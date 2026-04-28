'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { X, Zap, Send, Lock } from 'lucide-react';

export default function ChatBox({ isOpen, onClose }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Halo! Saya asisten NFOF. Ada yang bisa saya bantu pilihkan hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !session) return;

    const userMsg = { role: 'user', text: input };
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: data.error || 'Waduh King, ada gangguan teknis nih. Coba lagi ya! 🥶'
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Maaf, saya sedang mengalami gangguan. Coba lagi nanti.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:max-w-md md:right-10 md:top-20 md:bottom-28 md:h-[600px] md:shadow-2xl md:rounded-3xl overflow-hidden border">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"><Zap size={16} /></div>
          <span className="font-bold uppercase tracking-widest text-sm">NFOF AI Assistant</span>
        </div>
        <button onClick={onClose}><X /></button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white shadow-sm border rounded-tl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-xs text-gray-400 italic">AI sedang mengetik...</p>}
      </div>
      <div className="p-4 bg-white border-t flex gap-2">
        {session ? (
          <>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tanya asisten NFOF..."
              className="flex-1 p-3 bg-gray-100 rounded-full outline-none text-sm"
            />
            <button onClick={sendMessage} className="p-3 bg-black text-white rounded-full"><Send size={18} /></button>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400">
            <Lock size={14} /> Login to Chat
          </div>
        )}
      </div>
    </div>
  );
}
