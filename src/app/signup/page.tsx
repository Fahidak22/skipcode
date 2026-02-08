export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 bg-white/5 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h2>
        <input type="text" placeholder="الاسم الكامل" className="w-full p-3 mb-4 bg-black border border-gray-700 rounded-lg" />
        <input type="email" placeholder="البريد الجامعي (اختياري)" className="w-full p-3 mb-4 bg-black border border-gray-700 rounded-lg" />
        <input type="password" placeholder="كلمة المرور" className="w-full p-3 mb-6 bg-black border border-gray-700 rounded-lg" />
        <button className="w-full py-3 bg-blue-600 rounded-lg font-bold">تسجيل مجاني</button>
      </div>
    </main>
  );
}