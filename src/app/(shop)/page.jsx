'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ArrowDown, Zap, ShieldCheck, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import ChatBox from '@/components/ai/ChatBox';
import ModalLogin from '@/components/ui/ModalLogin';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const { data: session } = useSession();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="h-screen bg-black flex flex-col items-center justify-center text-white text-center p-6 relative">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none">NFOF</h1>
          <p className="text-sm md:text-xl font-light tracking-[0.4em] uppercase opacity-60">No Fear of Failure</p>
        </div>
        <div className="absolute bottom-12 flex flex-col items-center animate-bounce opacity-40">
          <p className="text-[10px] uppercase tracking-widest mb-2">Scroll To Discover</p>
          <ArrowDown size={20} />
        </div>
      </section>

      {/* Featured Drop Marquee */}
      <div className="bg-white border-y border-black py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-[10px] font-black uppercase tracking-[0.5em] mx-12">New Drop: AW24 "Resilience" Collection — Out Now — AI Assisted Sizing</span>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 md:px-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 leading-tight">Mendefinisikan <br/> Ulang Gaya.</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              NFOF bukan sekadar brand clothing. Kami adalah ekosistem digital yang membawa kemudahan belanja marketplace internasional langsung ke tanganmu.
            </p>
            <div className="flex gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl">
                <ShieldCheck className="mb-2 text-black" />
                <span className="text-[10px] font-bold uppercase">Safe Global Payment</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <Info className="mb-2 text-black" />
                <span className="text-[10px] font-bold uppercase">Quality Verified</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 aspect-square rounded-[3rem] flex items-center justify-center p-12">
            <div className="text-center">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Zap size={32} className="text-blue-600" />
               </div>
               <h3 className="text-xl font-bold uppercase">Powered by AI</h3>
               <p className="text-sm text-gray-400 mt-2 italic">Gemini Pro Integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Teaser Section */}
      <section className="bg-black text-white py-24 px-6 md:px-20 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-block px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Digital Assistant</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none">Asisten Pribadi <br/> Melayani Kamu.</h2>
            <p className="opacity-60 text-lg max-w-md">
              Bingung pilih ukuran atau mix & match? Asisten AI kami melayanimu layaknya personal shopper di butik internasional.
            </p>
            <Button
              variant="outline"
              className="bg-white text-black border-none"
              onClick={() => setIsChatOpen(true)}
            >
              Tanya Asisten AI
            </Button>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] space-y-4">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex shrink-0 items-center justify-center"><Zap size={20} /></div>
                  <div className="bg-white/10 p-4 rounded-2xl text-sm italic">"Tentu! Jaket Cargo hitam ini paling cocok dipadukan dengan aksesoris rantai perak kami."</div>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
          </div>
        </div>
      </section>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ModalLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <BottomNav
        activeTab="home"
        setActiveTab={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        isLoggedIn={!!session}
        onOpenLogin={() => setShowLogin(true)}
      />
    </div>
  );
}
