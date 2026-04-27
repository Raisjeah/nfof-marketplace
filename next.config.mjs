/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Optimasi Gambar (Sangat Penting untuk E-commerce)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Untuk gambar demo yang kamu pakai
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Untuk upload gambar produk asli nanti
      },
    ],
  },

  // 2. Mengaktifkan fitur Server Actions (Wajib untuk integrasi AI & DB yang modern)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Limit ukuran data yang dikirim ke server (misal upload foto)
    },
  },

  // 3. Keamanan & Header (Opsional tapi bagus untuk SEO)
  reactStrictMode: true, // Membantu menemukan bug di React lebih awal
  
  // 4. Menghindari error saat build jika ada folder yang kosong di dalam /app
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
