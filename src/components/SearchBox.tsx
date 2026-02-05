"use client"; // هذا السطر ضروري لأننا نستخدم التفاعل (Click/Type)

import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سنضع منطق البحث لاحقاً
    console.log("Searching for:", query);
    alert(`جاري البحث عن: ${query}`); // تنبيه مؤقت للتجربة
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl relative group">
      {/* 1. تأثير التوهج الخلفي (Glow Effect) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-25 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"></div>
      
      {/* 2. مربع الإدخال الرئيسي */}
      <div className="relative flex items-center bg-black rounded-full ring-1 ring-gray-800 shadow-xl">
        {/* أيقونة البحث */}
        <div className="pl-6 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* حقل الكتابة */}
        <input
          type="text"
          className="w-full bg-transparent text-white px-4 py-5 text-lg focus:outline-none placeholder-gray-500"
          placeholder="ابحث عن شركة (مثلاً: Wix, Mobileye)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* زر البحث */}
        <button 
          type="submit"
          className="mr-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          بحث
        </button>
      </div>
    </form>
  );
}