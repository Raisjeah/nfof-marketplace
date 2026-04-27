import { NextResponse } from 'next/server';
import { geminiUser } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req) {
  try {
    const { message, userId } = await req.json();
    await dbConnect();

    // Get all products to provide context to Gemini
    const products = await Product.find({});
    const context = `You are an AI Assistant for NFOF Marketplace.
    Here is our product list: ${JSON.stringify(products)}.
    User says: ${message}
    Please provide helpful recommendations, stock info, and style advice. Be friendly and use a cool, minimalist tone.`;

    const result = await geminiModel.generateContent(context);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
