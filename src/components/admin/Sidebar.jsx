import Link from 'next/link';
export function Sidebar(){return <aside className="border-r border-zinc-200 p-6"><div className="mb-8">Admin</div><div className="grid gap-3"><Link href="/dashboard">Dashboard</Link><Link href="/inventory">Inventory</Link><Link href="/orders">Orders</Link></div></aside>;}
