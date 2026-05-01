import { NextResponse } from 'next/server';

export async function POST(req) {
  const payload = await req.json();
  return NextResponse.json({ message: 'Checkout created', paymentMethod: payload.paymentMethod || 'COD' });
}
