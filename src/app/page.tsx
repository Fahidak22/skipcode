import Image from "next/image";
import SearchBox from "@/components/SearchBox"; // استدعاء المكون الجديد

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white p-4 overflow-hidden">
      
      {/* خلفية جمالية متحركة */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 text-center w-full max-w-4xl space-y-10">
        
        {/* الشعار والعنوان */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex justify-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10">
              <Image 
                src="/logo.jpg" 
                alt="SkipCode Logo" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Skip</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Code</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            أكبر قاعدة بيانات للأسئلة الحقيقية من مقابلات شركات الهايتك في إسرائيل.
            <br />
            <span className="text-sm text-gray-500">لا تضيّع وقتك في LeetCode.. ادرس ما سيأتي في الامتحان.</span>
          </p>
        </div>

        {/* منطقة البحث الجديدة */}
        <div className="flex justify-center w-full px-4">
          <SearchBox />
        </div>

        {/* الشركات الشائعة */}
        <div className="pt-8 text-sm text-gray-500">
          <p className="mb-4 uppercase tracking-widest text-xs font-semibold opacity-50">الأكثر بحثاً اليوم</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Wix", "Mobileye", "Microsoft", "Monday.com", "Lightricks"].map((company) => (
              <span key={company} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer transition text-gray-300">
                {company}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}