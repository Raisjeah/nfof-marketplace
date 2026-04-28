'use client';
import { useState } from 'react';
import { Send, Terminal } from 'lucide-react';

export default function AICommandCenter() {
  const [command, setCommand] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const executeCommand = async () => {
    if (!command.trim() || loading) return;
    setLoading(true);
    setStatus('Executing command...');

    try {
      const res = await fetch('/api/ai-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus(`Error: ${data.error}`);
      } else {
        const { action, target, message } = data.data;
        setStatus(`[${action}] ${target}: ${message}`);
        setCommand('');
        // Trigger a refresh if the parent provides one
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('refresh-data'));
        }
      }
    } catch (error) {
      setStatus('Failed to execute command.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-green-400 p-6 rounded-3xl font-mono text-sm border border-gray-800">
      <div className="flex items-center gap-2 mb-4 text-white">
        <Terminal size={18} />
        <span className="font-bold uppercase">AI Command Center</span>
      </div>
      <div className="bg-gray-900 p-4 rounded-xl mb-4 h-32 overflow-y-auto">
        <p className="opacity-50 tracking-tighter">Waiting for admin command...</p>
        {status && <p className="mt-2 text-white">{status}</p>}
      </div>
      <div className="flex gap-2">
        <input
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeCommand()}
          placeholder="e.g. tolong untuk sweater tambahin stocknya 5"
          className="flex-1 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 outline-none focus:border-green-500 text-white"
        />
        <button
          onClick={executeCommand}
          disabled={loading}
          className="bg-green-500 text-black p-2 rounded-full hover:bg-green-400 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
