'use client';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { LayoutDashboard, Box, ShoppingCart, LogOut } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (status === "loading") return <div className="p-12 text-center font-bold tracking-widest animate-pulse">VERIFYING ADMIN ACCESS...</div>;

  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-black text-white p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-black italic tracking-tighter">NFOF ADMIN</h2>
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest hover:text-blue-400">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest hover:text-blue-400">
            <Box size={16} /> Inventory
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest hover:text-blue-400">
            <ShoppingCart size={16} /> Orders
          </Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 font-bold uppercase text-[10px] tracking-widest text-red-500"
        >
          <LogOut size={16} /> Logout
        </button>
      </aside>
      <main className="flex-1 p-12">
        {children}
      </main>
    </div>
  );
}
