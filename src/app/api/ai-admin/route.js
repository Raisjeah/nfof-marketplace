import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { runAdminCommand } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized. Admin only." }, { status: 403 });
    }

    const { command } = await req.json();
    await dbConnect();

    const data = await runAdminCommand(command);

    if (data.action === 'ERROR') {
      return NextResponse.json({ error: data.message || "Gagal memproses perintah." }, { status: 400 });
    }

    if (data.action === 'UPDATE' && data.target === 'PRODUCT') {
      const { name, ...payload } = data.payload;
      await Product.findOneAndUpdate(
        { name: { $regex: new RegExp(name, 'i') } },
        { $set: payload }
      );
    } else if (data.action === 'CREATE' && data.target === 'PRODUCT') {
      await Product.create(data.payload);
    } else if (data.action === 'DELETE' && data.target === 'PRODUCT') {
      await Product.findOneAndDelete({ name: { $regex: new RegExp(data.payload.name, 'i') } });
    }

    return NextResponse.json({ message: data.message || "Action executed successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
