import { FileText, UserPlus, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Üst Bar (Logo Alanı) */}
      <nav className="p-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-blue-900">
          <Droplets size={28} className="text-blue-600" />
          <span className="text-xl font-bold tracking-tight">SU YÖNETİMİ</span>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto pt-16 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
          Dijital Su Yönetimi
        </h1>
        <p className="text-lg text-slate-600 mb-16 max-w-lg mx-auto">
          Abonelik işlemlerinizi, faturalarınızı ve arıza kayıtlarınızı güvenli bir ortamda yönetin.
        </p>

        {/*Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
          <button 
            onClick={() => navigate('/abonelik-basvuru')}
            className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm card-hover"
          >
            <div className="p-4 bg-blue-50 rounded-xl">
              <UserPlus className="text-blue-600" size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-slate-900">Abonelik Başvurusu</h3>
              <p className="text-sm text-slate-500">Yeni üyelik işlemlerini başlatın</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/fatura-goruntuleme')}
            className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm card-hover"
          >
            <div className="p-4 bg-blue-50 rounded-xl">
              <FileText className="text-blue-600" size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-slate-900">Fatura Görüntüleme</h3>
              <p className="text-sm text-slate-500">Güncel borçlarınızı inceleyin</p>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}