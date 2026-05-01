import { ProductCard } from '@/components/shop/ProductCard';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
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
