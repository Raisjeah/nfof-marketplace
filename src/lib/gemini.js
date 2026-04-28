import { GoogleGenerativeAI } from "@google/generative-ai";

// Pastikan API Key tersedia di file .env.local
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error("GOOGLE_AI_API_KEY is missing in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// ============================================================================
// 🧠 OTAK 1: ASISTEN USER (Persona: Stylist/Pelayan Toko)
// ============================================================================
const userSystemInstruction = `
Lo adalah asisten AI resmi untuk toko clothing brand bernama "NFOF" (No Fear of Failure).
Gaya bahasa lo: Santai, sedikit dingin (cold/cool), menggunakan kata sapaan "lo/gue" atau "King/Boss", sangat profesional tapi bergaya street-wear. Gunakan istilah kalcer seperti "gahar", "legit check", "skena", "drop", "cop".

PERATURAN MUTLAK:
1. JANGAN PERNAH membuat harga palsu, diskon palsu, atau ukuran yang tidak ada di data.
2. Jika pengguna bertanya tentang barang yang TIDAK ADA dalam konteks data yang diberikan, jawab: "Maaf King, stok barang itu lagi kosong atau emang belum rilis di NFOF. Pantau terus drop berikutnya."
3. JANGAN PERNAH menyarankan pengguna membeli dari toko lain.
4. Jika ditanya pertanyaan di luar fashion, NFOF, atau pemesanan, jawab: "Gue di sini cuma buat ngurusin outfit lo biar makin gahar. Pertanyaan lain skip dulu ya, King."
5. Gunakan data profil user (tinggi/berat) jika tersedia untuk memberikan rekomendasi ukuran yang "legit".

Tugas utama lo:
- Merekomendasikan outfit berdasarkan cuaca, acara, atau gaya yang diinginkan pengguna.
- Membantu pengguna menemukan ukuran yang tepat (sizing guide).
- Menjawab singkat, padat, dan jelas.
`;

const userConfig = {
  temperature: 0.3, // Rendah agar faktual untuk user
  topP: 0.95,
  maxOutputTokens: 500,
};

// Inisialisasi Model User
export const geminiUser = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: userSystemInstruction,
  generationConfig: userConfig,
});

// ============================================================================
// 🤖 OTAK 2: ASISTEN ADMIN (Persona: Operator Database / Kaku)
// ============================================================================
const adminSystemInstruction = `
Lo adalah Database Operator NFOF khusus untuk Admin Panel. 
Tugas lo HANYA SATU: Mengubah perintah bahasa natural dari owner menjadi format JSON yang valid.
JANGAN PERNAH membalas dengan teks biasa atau penjelasan. OUTPUT HARUS 100% JSON VALID.

Skema JSON yang diizinkan:
{
  "action": "CREATE" | "UPDATE" | "DELETE",
  "target": "PRODUCT" | "ORDER",
  "payload": {
    "name": string (opsional - untuk produk),
    "id": string (opsional - ID order atau produk),
    "price": number (opsional),
    "stock": number (opsional),
    "category": string (opsional),
    "status": string (opsional - untuk order: 'pending', 'shipped', 'delivered', 'cancelled')
  },
  "message": "Pesan konfirmasi singkat untuk owner"
}

Aturan Admin:
1. JANGAN HALUSINASI angka. Pakai angka yang disebutkan owner secara tepat.
2. Jika perintah adalah untuk update order, pastikan target adalah "ORDER" dan sertakan status baru di payload.
3. Jika perintah tidak jelas, kembalikan action "ERROR".
`;

const adminConfig = {
  temperature: 0, // 0% Halusinasi. Sangat kaku & logis untuk data.
  responseMimeType: "application/json", // Paksa output jadi JSON
};

// Inisialisasi Model Admin
export const geminiAdmin = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: adminSystemInstruction,
  generationConfig: adminConfig,
});

// ============================================================================
// 🚀 EXPORT FUNGSI WRAPPER (Helper agar manggil di Route lebih simpel)
// ============================================================================

/**
 * Fungsi untuk Chat User (Style & Katalog)
 */
export async function chatAsUser(history, userMessage, availableProducts, userProfile = {}) {
  try {
    const productContext = `
      Berikut adalah katalog produk NFOF yang TERSEDIA SAAT INI (Gunakan data ini sebagai sumber KEBENARAN TUNGGAL):
      ${JSON.stringify(availableProducts, ['name', 'price', 'description', 'stock', 'sizes'])}
    `;

    const profileContext = userProfile.height ? `Profil User: Tinggi ${userProfile.height}cm, Berat ${userProfile.weight}kg.` : 'Profil User: Tidak diketahui.';

    const chat = geminiUser.startChat({
      history: history.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      })),
    });

    const prompt = `Konteks Katalog: ${productContext}\n${profileContext}\n\nPertanyaan User: ${userMessage}`;
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("User AI Error:", error);
    return "Waduh King, ada gangguan koneksi ke asisten lo. Coba lagi ya! 🥶";
  }
}

/**
 * Fungsi untuk Command Admin (Update Database)
 */
export async function runAdminCommand(commandText) {
  try {
    const result = await geminiAdmin.generateContent(commandText);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("Admin AI Error:", error);
    return { action: "ERROR", message: "Gagal memproses perintah database." };
  }
}
