// 1. قم باستيراد HashRouter بدلاً من BrowserRouter
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Mukhalifeen from './pages/Mukhalifeen';
// ... باقي الاستيرادات

export default function App() {
  return (
    // 2. استخدم HashRouter هنا
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div className="text-center p-20 text-gold text-2xl">مرحباً بكم في شبكة المنتظر</div>} />
          {/* <Route path="mazalim" element={<Mazalim />} /> */}
          {/* <Route path="sahaba" element={<Sahaba />} /> */}
          <Route path="mukhalifeen" element={<Mukhalifeen />} />
          {/* <Route path="research" element={<Research />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}
