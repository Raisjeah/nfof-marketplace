import { StatCard } from '@/components/admin/StatCard';

export default function AdminDashboardPage() {
  return <section><h1 className="text-3xl mb-6">Dashboard</h1><div className="grid md:grid-cols-3 gap-4"><StatCard label="Sales" value="Rp 0" /><StatCard label="Orders" value="0" /><StatCard label="Products" value="0" /></div></section>;
}
