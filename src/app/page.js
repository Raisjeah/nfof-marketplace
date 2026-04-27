'use client';
import { useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import ChatAssistant from '@/components/ai/ChatAssistant';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Halo! Saya asisten NFOF.' }]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Nanti di sini kita panggil API Gemini
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'AI NFOF sedang berpikir...' }]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION (Pindahkan kode hero kamu di sini) */}
      <section className="h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-8xl font-black italic">NFOF</h1>
        <p className="tracking-[0.5em] uppercase opacity-50">No Fear of Failure</p>
      </section>

      {/* Komponen Modular */}
      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        input={input}
        setInput={setInput}
        onSendMessage={handleSendMessage}
      />

      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenChat={() => setIsChatOpen(true)}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => alert('Buka Modal Login')}
      />
    </main>
  );
}
