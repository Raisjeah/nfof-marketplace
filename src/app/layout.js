'use client'
import BottomNav from "@/components/layout/BottomNav";
import { useState } from "react";

export default function ShopLayout({ children }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen">
      {/* Konten halaman (Home, Catalog, dll) */}
      {children}

      {/* 
         Panggil Komponen BottomNav di sini! 
         Hanya halaman di dalam folder (shop) yang akan punya BottomNav ini.
      */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
