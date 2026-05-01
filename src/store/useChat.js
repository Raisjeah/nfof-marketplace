'use client';
import { useState } from 'react';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => setMessages((prev) => [...prev, message]);
  const clearMessages = () => setMessages([]);
  return { messages, addMessage, clearMessages };
}
