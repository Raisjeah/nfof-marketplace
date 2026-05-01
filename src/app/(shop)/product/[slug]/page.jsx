import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export default async function ProductDetailPage({ params }) {
  await connectDB();
  const product = await Product.findOne({ slug: params.slug }).lean();
  if (!product) return notFound();

  return (
    <main className="p-8 md:p-12">
      <h1 className="text-3xl">{product.name}</h1>
      <p className="mt-4 text-zinc-600">{product.description}</p>
      <p className="mt-6 text-xl">Rp {product.price?.toLocaleString('id-ID')}</p>
    </main>
  );
}
