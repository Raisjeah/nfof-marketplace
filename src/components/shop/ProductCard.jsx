import Link from 'next/link';
export function ProductCard({ product }) { return <Link href={`/product/${product.slug}`} className="border border-zinc-200 p-4 block hover:border-black"><h3>{product.name}</h3><p className="text-zinc-600">Rp {product.price?.toLocaleString('id-ID')}</p></Link>; }
