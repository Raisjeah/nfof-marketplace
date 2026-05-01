export function ChatBubble({ role, text }) { return <div className={`p-3 border ${role === 'assistant' ? 'border-zinc-300' : 'border-black'}`}>{text}</div>; }
