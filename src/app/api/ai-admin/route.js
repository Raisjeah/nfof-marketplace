import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { runAdminCommand } from '@/lib/gemini';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';

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

    if (data.target === 'PRODUCT') {
      if (data.action === 'UPDATE') {
        const { id, name, ...payload } = data.payload;
        const query = id ? { _id: id } : { name: { $regex: new RegExp(name, 'i') } };
        await Product.findOneAndUpdate(query, { $set: payload });
      } else if (data.action === 'CREATE') {
        await Product.create(data.payload);
      } else if (data.action === 'DELETE') {
        const { id, name } = data.payload;
        const query = id ? { _id: id } : { name: { $regex: new RegExp(name, 'i') } };
        await Product.findOneAndDelete(query);
      }
    } else if (data.target === 'ORDER') {
      if (data.action === 'UPDATE') {
        const { id, status } = data.payload;
        await Order.findByIdAndUpdate(id, { $set: { status } });
      }
    }

    return NextResponse.json({ message: data.message || "Action executed successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
