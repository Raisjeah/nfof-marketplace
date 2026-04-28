import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { chatAsUser } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        error: "Silakan login terlebih dahulu untuk menggunakan asisten AI.",
        status: "UNAUTHENTICATED"
      }, { status: 401 });
    }

    const body = await req.json();
    const { message, history = [] } = body;
    await dbConnect();

    // Fetch user profile for personalized sizing
    const user = await User.findById(session.user.id).select('height weight');

    // Get all products to provide context to Gemini (limited fields to save tokens)
    const products = await Product.find({ stock: { $gt: 0 } })
      .select('name price description stock sizes category')
      .limit(20);

    const responseText = await chatAsUser(history, message, products, user || {});

    if (!responseText) {
      throw new Error("AI gagal memberikan respon. Coba lagi, King.");
    }

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json({
      error: error.message || "Waduh, otak gue lagi nge-hang. Coba lagi bentar ya!",
      status: "ERROR"
    }, { status: 500 });
  }
}
