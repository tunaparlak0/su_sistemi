import { FileText, UserPlus, Droplets, Settings, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        {/* Üst Bar (Logo Alanı) */}
        <nav className="p-6 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-blue-900">
            <Droplets size={28} className="text-blue-600" />
            <span className="text-xl font-bold tracking-tight">SASKİ Su Yönetimi</span>
          </div>
        </nav>

        <section className="max-w-5xl mx-auto pt-16 px-6 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Dijital Su Yönetimi
          </h1>
          <p className="text-lg text-slate-600 mb-16 max-w-lg mx-auto">
            Abonelik işlemlerinizi, faturalarınızı ve arıza kayıtlarınızı güvenli bir ortamda yönetin.
          </p>

          {/* Kartlar (2x2 Grid Yapısı) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto mb-16">
            
            {/* Abonelik Başvurusu */}
            <button 
              onClick={() => navigate('/abonelik-basvuru')}
              className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <UserPlus className="text-blue-600" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Abonelik Başvurusu</h3>
                <p className="text-sm text-slate-500">Yeni üyelik işlemlerini başlatın</p>
              </div>
            </button>

            {/* Fatura Görüntüleme */}
            <button 
              onClick={() => navigate('/fatura-goruntuleme')}
              className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <FileText className="text-blue-600" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Fatura Görüntüleme</h3>
                <p className="text-sm text-slate-500">Güncel borçlarınızı inceleyin</p>
              </div>
            </button>

            {/* Abonelik İşlemleri */}
            <button 
              onClick={() => navigate('/abonelik-islemleri')}
              className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <Settings className="text-blue-600" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Abonelik İşlemleri</h3>
                <p className="text-sm text-slate-500">Devir, iptal ve diğer işlemler</p>
              </div>
            </button>

            {/* Hakkımızda */}
            <button 
              onClick={() => navigate('/hakkimizda')}
              className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <div className="p-4 bg-blue-50 rounded-xl shrink-0">
                <Info className="text-blue-600" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Hakkımızda</h3>
                <p className="text-sm text-slate-500">Sistem ve kurum hakkında bilgi</p>
              </div>
            </button>

          </div>
        </section>
      </div>

      {/* Alt Footer Alanı */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
}