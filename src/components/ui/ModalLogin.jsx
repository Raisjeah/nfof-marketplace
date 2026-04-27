import { useState } from 'react';
import { X } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export default function ModalLogin({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsLogin = async () => {
    await signIn('credentials', { email, password, callbackUrl: '/' });
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 opacity-50"><X /></button>
        <h2 className="text-3xl font-black italic tracking-tighter mb-2 italic uppercase">NFOF LOGIN</h2>
        <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-bold">Secure Access</p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-black"
          />
          <Button
            onClick={handleCredentialsLogin}
            className="w-full"
          >
            Log In
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500 font-bold">Or</span></div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </Button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">Failure is part of the process. Join us.</p>
      </div>
    </div>
  );
}
