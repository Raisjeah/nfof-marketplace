import { ProductCard } from '@/components/shop/ProductCard';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

async function getProducts() {
  if (!process.env.MONGODB_URI) return [];
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="min-h-screen p-8 md:p-12">
      <h1 className="text-3xl mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </main>
  );
}
