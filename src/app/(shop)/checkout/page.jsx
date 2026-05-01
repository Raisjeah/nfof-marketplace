export default function CheckoutPage() {
  return (
    <main className="p-8 max-w-xl">
      <h1 className="text-3xl mb-6">Checkout</h1>
      <form className="space-y-4">
        <input className="w-full border border-zinc-300 p-3" placeholder="Alamat lengkap" />
        <select className="w-full border border-zinc-300 p-3"><option>COD</option><option>Transfer</option></select>
        <button className="border border-black px-4 py-2 hover:bg-black hover:text-white">Buat Pesanan</button>
      </form>
    </main>
  );
}
