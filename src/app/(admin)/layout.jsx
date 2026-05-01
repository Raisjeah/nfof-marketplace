import { Sidebar } from '@/components/admin/Sidebar';

export default function AdminLayout({ children }) {
  return <div className="min-h-screen grid grid-cols-[240px_1fr]"><Sidebar /> <main className="p-8">{children}</main></div>;
}
