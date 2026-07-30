import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Header({ title = "TSKİ Su Yönetimi", showHome = true, showBack = true }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
          >
            <ArrowLeft size={16} /> Geri Dön
          </button>
        ) : <div />}

        <div className="flex items-center gap-2 text-blue-900">
          <ShieldCheck size={26} className="text-blue-600" />
          <span className="font-bold tracking-tight text-lg">{title}</span>
        </div>

        {showHome && (
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
          >
            <Home size={16} /> Ana Sayfa
          </button>
        )}
      </div>
    </header>
  );
}