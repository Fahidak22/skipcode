"use client";

import Link from "next/link";

export default function InterviewsPage() {
  const interviews = [
    { 
      id: "101", // هذا الرقم مهم جداً لكي يفتح السؤال الصحيح
      title: "Design a Parking Lot System", 
      company: "Top Tier (Wix/Mobileye)", 
      type: "System Design" 
    },
    { 
      id: "102", 
      title: "Find the Bug: Race Condition in ATM", 
      company: "Fintech Giant", 
      type: "Debugging" 
    },
    { 
      id: "103", 
      title: "React: Optimize Infinite Scroll", 
      company: "Web Leader (Monday)", 
      type: "Frontend" 
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-red-500">🔥 مقابلات حقيقية</h1>
        <p className="text-gray-400 mb-8">أسئلة تم الإبلاغ عنها من قبل مرشحين في 2024-2025.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((item) => (
            // التغيير هنا: البطاقة بالكامل رابط
            <Link 
              href={`/problems/${item.id}`} 
              key={item.id} 
              className="relative block p-6 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform hover:border-red-500/30 group"
            >
              {/* تأثير الخلفية الحمراء */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 blur-2xl -z-10 group-hover:bg-red-500/20 transition-all"></div>
              
              <div className="text-xs font-mono text-red-400 mb-2">{item.company}</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              
              <div className="flex justify-between items-end mt-4">
                <span className="px-3 py-1 bg-white/10 rounded text-sm text-gray-300">{item.type}</span>
                <span className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-colors text-sm">
                  ابدأ الحل ⚡
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}