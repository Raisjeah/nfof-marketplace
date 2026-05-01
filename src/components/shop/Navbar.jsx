import Link from 'next/link';
export function Navbar(){return <nav className="flex items-center justify-between border-b border-zinc-200 p-4"><Link href="/">NFOF</Link><div className="flex gap-4"><Link href="/products">Products</Link><Link href="/cart">Cart</Link></div></nav>;}
