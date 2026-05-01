import { geminiModel } from '@/lib/gemini';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { messages } = await req.json();
  await connectDB();
  const products = await Product.find({}, 'name price stock tags category').limit(20).lean();
  const context = products.map((p) => `${p.name} | Rp${p.price} | stock:${p.stock} | ${p.category}`).join('\n');
  const chatText = (messages || []).map((m) => `${m.role}: ${m.content}`).join('\n');

  const prompt = `You are Aris, a sophisticated personal stylist. Recommend only in-stock items.\nContext:\n${context}\n\nConversation:\n${chatText}`;
  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  return NextResponse.json({ text });
}
