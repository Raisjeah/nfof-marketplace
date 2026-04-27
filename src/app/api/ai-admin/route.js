import { NextResponse } from 'next/server';
import { geminiAdmin } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req) {
  try {
    const { command } = await req.json();
    await dbConnect();

    const products = await Product.find({});
    const prompt = `You are an Admin Manager AI for NFOF Marketplace.
    Current Inventory: ${JSON.stringify(products)}.
    Admin Command: "${command}"

    Your task is to interpret the command and return a JSON object that can be used to update the database.
    Format: { "action": "update_stock" | "update_price", "productName": string, "value": number }
    If you cannot interpret it, return { "error": "command not understood" }.
    Only return the JSON.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Basic parsing logic (Gemini sometimes adds markdown code blocks)
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonStr);

    if (data.action === 'update_stock') {
      await Product.findOneAndUpdate(
        { name: { $regex: new RegExp(data.productName, 'i') } },
        { $inc: { stock: data.value } }
      );
    } else if (data.action === 'update_price') {
      await Product.findOneAndUpdate(
        { name: { $regex: new RegExp(data.productName, 'i') } },
        { price: data.value }
      );
    }

    return NextResponse.json({ message: "Action executed successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
