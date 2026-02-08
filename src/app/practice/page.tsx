"use client";

import Link from "next/link";

export default function PracticePage() {
  // هذه البيانات يجب أن تتطابق IDs الخاصة بها مع قاعدة البيانات في صفحة المشكلة
  const problems = [
    { 
      id: "1", // هذا سيعمل لأننا أضفناه في صفحة المشكلة
      title: "Binary Tree Inversion", 
      type: "Algorithm", 
      difficulty: "Easy", 
      tags: ["Trees", "Recursion"] 
    },
    { 
      id: "2", // هذا سيعمل أيضاً
      title: "CS 234201: Exam 2024 Q3", 
      type: "University Exam", 
      difficulty: "Hard", 
      tags: ["Technion", "Pointers"] 
    },
    { 
      id: "3", // هذا مثال إضافي (قد يظهر فارغاً إذا لم تضفه في قاعدة البيانات)
      title: "Merge K Sorted Lists", 
      type: "Algorithm", 
      difficulty: "Medium", 
      tags: ["Heaps"] 
    },
    { 
      id: "4", 
      title: "Intro to CS: Midterm Q1", 
      type: "University Exam", 
      difficulty: "Medium", 
      tags: ["Haifa Uni", "Loops"] 
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          معسكر التدريب (Bootcamp)
        </h1>
        <p className="text-gray-400 mb-8">أساسيات الخوارزميات + امتحانات جامعية حقيقية.</p>

        {/* قائمة الأسئلة */}
        <div className="grid gap-4">
          {problems.map((p) => (
            // التغيير هنا: جعلنا البطاقة كلها عبارة عن رابط ينقل لصفحة السؤال
            <Link 
              href={`/problems/${p.id}`} 
              key={p.id} 
              className="block p-6 bg-white/5 border border-white/10 rounded-xl hover:border-green-500/50 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-green-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs ${p.type === 'University Exam' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {p.type}
                    </span>
                    {p.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-400">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                  p.difficulty === 'Hard' ? 'border-red-500 text-red-500' :
                  p.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-500' :
                  'border-green-500 text-green-500'
                }`}>
                  {p.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}