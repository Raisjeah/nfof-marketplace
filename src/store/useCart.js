import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) => set((state) => {
    const existing = state.items.find((item) => item.product._id === product._id);
    if (existing) {
      return { items: state.items.map((item) => item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item) };
    }
    return { items: [...state.items, { product, quantity }] };
  }),
  removeItem: (productId) => set((state) => ({ items: state.items.filter((item) => item.product._id !== productId) })),
  clearCart: () => set({ items: [] }),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}));
