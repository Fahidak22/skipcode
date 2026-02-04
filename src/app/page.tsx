import Link from "next/link";
import Image from "next/image"; // 1. استدعاء أداة الصور الذكية

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white p-4">
      {/* الخلفية والمؤثرات البسيطة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20 pointer-events-none" />

      <div className="z-10 text-center max-w-3xl space-y-8">
        {/* الشعار والاسم */}
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            
            {/* 2. هنا وضعنا الشعار الجديد */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-green-500/20">
              <Image 
                src="/logo.jpg"       // Next.js يبحث تلقائياً في مجلد public
                alt="SkipCode Logo" 
                fill                  // يملأ الإطار الدائري
                className="object-cover"
                priority              // تحميل سريع لأنه في وجه المستخدم
              />
            </div>

          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="text-blue-500">Skip</span>
            <span className="text-green-400">Code</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            طريقك المختصر للعمل في <span className="text-white font-semibold">Wix</span> و <span className="text-white font-semibold">Mobileye</span>.
          </p>
        </div>

        {/* أزرار الدعوة لاتخاذ إجراء */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black text-lg font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            ابدأ التصفح الآن 🚀
          </button>
          
          <button className="px-8 py-4 border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-300 text-lg font-medium rounded-full transition-all">
            كيف يعمل؟
          </button>
        </div>

        {/* إثبات اجتماعي بسيط */}
        <div className="pt-8 text-sm text-gray-500">
          <p>أسئلة مسربة وحقيقية من مقابلات 2025:</p>
          <div className="flex gap-4 justify-center mt-2 opacity-60">
            <span>Wix</span> • <span>Mobileye</span> • <span>CheckPoint</span> • <span>Microsoft IL</span>
          </div>
        </div>
      </div>
    </main>
  );
}