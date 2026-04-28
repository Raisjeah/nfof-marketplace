import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized. Admin only." }, { status: 403 });
    }

    await dbConnect();
    const data = await req.json();

    // Auto-generate slug if not provided
    if (!data.slug && data.name) {
      let slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      // Basic collision avoidance
      const existing = await Product.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
      }
      data.slug = slug;
    }

    const product = await Product.create(data);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
