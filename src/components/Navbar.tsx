"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. الشعار والاسم */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-green-500 transition-colors">
              <Image src="/logo.jpg" alt="SkipCode" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Skip</span>
              <span className="text-green-500">Code</span>
            </span>
          </Link>

          {/* 2. الروابط الرئيسية (للشاشات الكبيرة) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              <Link href="/practice" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all">
                المعسكر (Practice)
              </Link>
              <Link href="/interviews" className="text-gray-300 hover:text-green-400 hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all">
                مقابلات حقيقية 🔥
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all">
                عن الموقع
              </Link>
            </div>
          </div>

          {/* 3. أزرار الدخول (للشاشات الكبيرة) */}
          <div className="hidden md:flex gap-3">
            <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              تسجيل الدخول
            </Link>
            <Link href="/signup" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-lg shadow-green-900/20">
              ابدأ مجاناً
            </Link>
          </div>

          {/* 4. زر القائمة للموبايل (Hamburger) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 5. القائمة المنسدلة للموبايل */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-right">
            <Link href="/practice" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              المعسكر (Practice)
            </Link>
            <Link href="/interviews" className="text-gray-300 hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium">
              مقابلات حقيقية 🔥
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}