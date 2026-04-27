import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ModalLogin({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute right-6 top-6 opacity-50"><X /></button>
        <h2 className="text-3xl font-black italic tracking-tighter mb-2 italic uppercase">NFOF LOGIN</h2>
        <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-bold">Secure Access</p>
        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-black" />
          <input type="password" placeholder="Password" className="w-full p-4 bg-gray-100 rounded-2xl outline-none focus:ring-2 ring-black" />
          <Button
            onClick={onLogin}
            className="w-full"
          >
            Log In
          </Button>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">Failure is part of the process. Join us.</p>
      </div>
    </div>
  );
}
