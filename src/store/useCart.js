'use client';
import { useMemo, useState } from 'react';

export function useCart() {
  const [items, setItems] = useState([]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) => (
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId) => setItems((prev) => prev.filter((item) => item.product._id !== productId));
  const clearCart = () => setItems([]);
  const totalPrice = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  return { items, addItem, removeItem, clearCart, totalPrice };
}
