import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group relative">
      <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 mb-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 p-4 bg-white rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <ShoppingBag size={20} />
        </button>
      </div>
      <Link href={`/product/${product._id}`}>
        <h3 className="font-bold text-sm uppercase tracking-tight hover:underline">{product.name}</h3>
      </Link>
      <p className="text-gray-400 text-sm">$ {product.price}.00</p>
    </div>
  );
}
