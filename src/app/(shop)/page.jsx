import Link from 'next/link';

export default function ShopLandingPage() {
  return (
    <main className="min-h-screen border border-zinc-200 p-8 md:p-16">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">NFOF</p>
      <h1 className="mt-6 text-4xl md:text-6xl">No Fear of Failure</h1>
      <p className="mt-6 max-w-xl text-zinc-600">Monochrome essentials for accessories and clothing.</p>
      <Link href="/products" className="mt-10 inline-block border border-black px-6 py-3 hover:bg-black hover:text-white">Shop Now</Link>
    </main>
  );
}
