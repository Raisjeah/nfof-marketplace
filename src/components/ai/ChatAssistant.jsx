import { X, Zap, Send } from 'lucide-react';

export default function ChatAssistant({ isOpen, onClose, messages, input, setInput, onSendMessage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white flex flex-col md:max-w-md md:right-10 md:top-20 md:bottom-28 md:h-[600px] md:shadow-2xl md:rounded-3xl overflow-hidden border">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"><Zap size={16} /></div>
          <span className="font-bold uppercase tracking-widest text-sm">NFOF AI</span>
        </div>
        <button onClick={onClose}><X /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white shadow-sm border'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Tanya asisten NFOF..." 
          className="flex-1 p-3 bg-gray-100 rounded-full outline-none text-sm"
        />
        <button onClick={onSendMessage} className="p-3 bg-black text-white rounded-full"><Send size={18} /></button>
      </div>
    </div>
  );
}
