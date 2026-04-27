'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError('Invalid credentials');
    } else {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[3rem] p-12 shadow-2xl border border-gray-100">
        <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center mb-8">
          <Lock className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">ADMIN PANEL</h1>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">Authorized Access Only</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-6 bg-gray-50 rounded-[2rem] outline-none focus:ring-2 ring-black transition-all"
              placeholder="admin@nfof.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Security Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-6 bg-gray-50 rounded-[2rem] outline-none focus:ring-2 ring-black transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

          <Button type="submit" className="w-full py-6 rounded-[2rem] flex items-center justify-center gap-4 group">
            Authenticate <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
}
