"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import WhiteboardOverlay from "@/components/WhiteboardOverlay"; // استدعاء المكون الجديد

// نفس قاعدة البيانات القديمة (لم تتغير)
const problemsDB: any = {
  "1": { 
    title: "Binary Tree Inversion", 
    lang: "en", 
    difficulty: "Easy",
    description: "Given the root of a binary tree, invert the tree, and return its root.",
    examples: ["Input: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]"],
    starterCode: "def invertTree(root):\n    # Write your code here\n    pass"
  },
  "2": { 
    title: "تحليل التعقيد الزمني (Time Complexity)", 
    lang: "ar", 
    difficulty: "Hard",
    description: "قم بتحليل التعقيد الزمني للدالة التكرارية التالية.\n افترض أن n هو عدد المدخلات...",
    examples: ["راجع الصورة المرفقة (الشكل أ)"],
    starterCode: "# اكتب تحليلك هنا\ndef analyze():\n    pass"
  },
  "101": { 
    title: "Design a Parking Lot System", 
    lang: "en",
    difficulty: "Medium",
    description: "Design a parking lot system that can handle different vehicle types...",
    examples: ["Input: addVehicle('Car') -> Output: true"],
    starterCode: "class ParkingSystem:\n    def __init__(self, big, medium, small):\n        pass"
  }
};

export default function ProblemPage() {
  const params = useParams();
  const id = params.id as string;
  const problem = problemsDB[id];
  const [code, setCode] = useState("");

  useEffect(() => {
    if (problem) setCode(problem.starterCode);
  }, [problem]);

  if (!problem) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-16 flex flex-col md:flex-row h-screen overflow-hidden">
      
      {/* 🟢 القسم الأيسر: السؤال + اللوح الأبيض */}
      <div 
        className="relative w-full md:w-1/2 flex flex-col border-r border-gray-800"
        dir={problem.lang === 'ar' ? 'rtl' : 'ltr'} 
      >
        {/* شريط العنوان البسيط */}
        <div className="flex items-center gap-3 p-4 bg-[#111] border-b border-gray-800 z-20">
            <Link href="/practice" className="text-gray-400 hover:text-white text-sm">
                {problem.lang === 'ar' ? '← رجوع' : '← Back'}
            </Link>
            <span className={`px-2 py-0.5 rounded text-xs border ${
                problem.difficulty === 'Hard' ? 'border-red-500 text-red-500' :
                'border-green-500 text-green-500'
            }`}>
                {problem.difficulty}
            </span>
        </div>

        {/* منطقة المحتوى (Scrollable) */}
        {/* نضع relative هنا لأن اللوح الأبيض سيأخذ حجم هذا العنصر */}
        <div className="relative flex-1 overflow-y-auto bg-[#0a0a0a]">
            
            {/* ✨ هنا وضعنا المكون السحري ✨ */}
            <WhiteboardOverlay />

            {/* محتوى النص */}
            <div className="p-6 relative z-0"> {/* z-0 ليكون تحت الرسم */}
                <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
                <div className="prose prose-invert max-w-none mb-8">
                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                        {problem.description}
                    </p>
                </div>

                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    {problem.lang === 'ar' ? 'أمثلة:' : 'Examples:'}
                </h3>
                {problem.examples.map((ex: string, i: number) => (
                    <div key={i} className="bg-[#1e1e1e] p-4 rounded border border-gray-700 font-mono text-sm mb-4" dir="ltr">
                        {ex}
                    </div>
                ))}
                
                {/* مساحة فارغة في الأسفل لتجربة السكرول والرسم */}
                <div className="h-64 border-t border-dashed border-gray-800 mt-8 pt-4 text-gray-600 text-center">
                    (مساحة إضافية للرسم والشرح - Scratchpad Area)
                </div>
            </div>
        </div>
      </div>

      {/* 🔵 القسم الأيمن: محرر الكود */}
      <div className="w-full md:w-1/2 flex flex-col bg-[#1e1e1e]" dir="ltr">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black">
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-400">● Online</span>
            <span className="text-sm text-gray-300 font-mono">Python 3</span>
          </div>
          <button className="px-6 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded text-sm active:scale-95">
            Run Code ▶
          </button>
        </div>

        <div className="flex-1 relative">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-gray-800 text-gray-600 text-right pr-2 pt-4 font-mono text-sm select-none">
                1<br/>2<br/>3<br/>4<br/>...
            </div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent text-gray-200 font-mono p-4 pl-14 text-sm focus:outline-none resize-none leading-6"
                spellCheck="false"
                placeholder="Write your solution here..."
            />
        </div>
      </div>

    </div>
  );
}