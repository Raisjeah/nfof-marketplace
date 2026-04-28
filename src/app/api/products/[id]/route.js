import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    // Support fetching by ID or Slug
    const product = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
