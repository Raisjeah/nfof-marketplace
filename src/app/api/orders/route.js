import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User'; // Ensure User model is loaded for populate

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized. Admin only." }, { status: 403 });
    }

    await dbConnect();
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
