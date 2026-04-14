import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark text-gray-200 font-arabic flex flex-col">
      <nav className="bg-darker border-b border-gold/20 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gold">شبكة المنتظر</Link>
          <div className="space-x-6 space-x-reverse flex text-lg">
            <Link to="/mazalim" className="hover:text-gold transition">مظالم أهل البيت</Link>
            <Link to="/sahaba" className="hover:text-gold transition">الصحابة العدول</Link>
            <Link to="/mukhalifeen" className="hover:text-red-500 transition">المخالفون</Link>
            <Link to="/research" className="hover:text-gold transition">البحوث</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-darker border-t border-gold/20 p-6 text-center mt-12">
        <p className="text-gray-400 text-sm">
          جميع المحتويات مستمدة من الموقع الأصلي: 
          <a href="http://www.kingoflinks.net/" target="_blank" rel="noreferrer" className="text-gold mx-1 hover:underline">
            King of Links
          </a>
          <br/> إعادة الاستخدام مصرح بها من قبل المؤلف الأصلي.
        </p>
      </footer>
    </div>
  );
}
