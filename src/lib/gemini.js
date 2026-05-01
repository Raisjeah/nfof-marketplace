import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_AI_API_KEY || '';
const client = new GoogleGenerativeAI(apiKey);
const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const geminiModel = model;

export async function chatAsUser(history = [], message = '', products = [], user = {}) {
  const historyText = history
    .slice(-10)
    .map((item) => `${item.role || 'user'}: ${item.content || ''}`)
    .join('\n');

  const productsText = products
    .map((p) => `${p.name} | Rp${p.price} | stock:${p.stock} | sizes:${(p.sizes || []).join(', ')}`)
    .join('\n');

  const prompt = [
    'Kamu adalah asisten belanja fashion NFOF.',
    'Berikan rekomendasi yang relevan, singkat, dan ramah.',
    `Profil user: tinggi ${user?.height || '-'} cm, berat ${user?.weight || '-'} kg.`,
    `Daftar produk:\n${productsText}`,
    `Riwayat chat:\n${historyText}`,
    `Pertanyaan user: ${message}`,
  ].join('\n\n');

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function runAdminCommand(command = '') {
  const prompt = [
    'Parse admin command into strict JSON.',
    'Return ONLY valid JSON with keys: target, action, payload, message.',
    'target in ["PRODUCT","ORDER","UNKNOWN"], action in ["CREATE","UPDATE","DELETE","ERROR"].',
    `command: ${command}`,
  ].join('\n');

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim().replace(/^```json\s*|\s*```$/g, '');

  try {
    return JSON.parse(raw);
  } catch {
    return { target: 'UNKNOWN', action: 'ERROR', payload: {}, message: raw || 'Invalid AI response' };
  }
}
