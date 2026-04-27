import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-transparent mix-blend-difference text-white">
      <Link href="/" className="text-3xl font-black italic tracking-tighter">NFOF</Link>
      <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
        <Link href="/catalog" className="hover:opacity-50">Catalog</Link>
        <Link href="/about" className="hover:opacity-50">Philosophy</Link>
        <Link href="/admin/dashboard" className="hover:opacity-50 text-blue-400">Admin</Link>
      </div>
    </nav>
  );
}
