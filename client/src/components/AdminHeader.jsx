import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, Globe, LogOut } from 'lucide-react';

export default function AdminHeader() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'WORKER';

  // 📌 Çıkış Yap Fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/admin-login');
  };

  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => navigate('/admin-panel')} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
        >
          <Home size={16} /> Admin Ana Sayfa
        </button>

        <div className="flex items-center gap-2 text-blue-900">
          <ShieldCheck size={26} className="text-blue-600" />
          <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli ({userRole})</span>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
          >
            <Globe size={16} /> Site
          </button>

          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-xl border border-red-200"
          >
            <LogOut size={16} /> Çıkış
          </button>
        </div>
      </div>
    </header>
  );
}