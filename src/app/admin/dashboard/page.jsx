export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter">Dashboard Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Revenue', value: '$ 12,450' },
          { label: 'Total Orders', value: '156' },
          { label: 'Active Users', value: '2,840' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
            <p className="text-4xl font-black italic">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-black text-white p-12 rounded-[3rem] relative overflow-hidden">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">NFOF Insight</h2>
        <p className="opacity-60 text-sm max-w-md">The AI predicts a 20% increase in demand for 'Cargo Pants' next week based on current user chat trends.</p>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-600/30 blur-[60px] rounded-full"></div>
      </div>
    </div>
  );
}
