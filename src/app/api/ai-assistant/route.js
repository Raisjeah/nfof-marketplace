import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { chatAsUser } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Silakan login terlebih dahulu untuk menggunakan asisten AI." }, { status: 401 });
    }

    const { message, history = [] } = await req.json();
    await dbConnect();

    // Get all products to provide context to Gemini
    const products = await Product.find({});

    const responseText = await chatAsUser(history, message, products);

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
