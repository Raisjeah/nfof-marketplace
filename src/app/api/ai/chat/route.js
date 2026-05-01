import { streamText } from 'ai';
import { geminiModel } from '@/lib/gemini';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function POST(req) {
  const { messages } = await req.json();
  await connectDB();
  const products = await Product.find({}, 'name price stock tags category').limit(20).lean();
  const context = products.map((p) => `${p.name} | Rp${p.price} | stock:${p.stock} | ${p.category}`).join('\n');

  const result = streamText({
    model: geminiModel,
    system: `You are Aris, a sophisticated personal stylist. Recommend only in-stock items. Context:\n${context}`,
    messages,
  });

  return result.toDataStreamResponse();
}
