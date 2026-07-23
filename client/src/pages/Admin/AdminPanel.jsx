import { useNavigate } from 'react-router-dom';
import { UserPlus, CheckCircle, ShieldCheck, Users, Home, Globe } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            
            {/* Sol: Admin Ana Sayfa Butonu */}
            <button 
              onClick={() => navigate('/admin-panel')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Admin Ana Sayfa
            </button>

            {/* Orta: Logo ve Başlık */}
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli</span>
            </div>

            {/* Sağ: Sitenin Ana Sayfasına Dönüş Butonu */}
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Globe size={16} /> Site Ana Sayfa
            </button>

          </div>
        </header>

        {/* Ana İçerik Alanı */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
          </div>

          {/* Kartlar (3'lü Grid Yapısı) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Yeni Admin Ekle */}
            <button 
              onClick={() => navigate('/admin-olustur')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-blue-50 rounded-xl w-fit">
                <UserPlus className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Yeni Admin Ekle</h3>
                <p className="text-sm text-slate-500">Sisteme yeni yönetici tanımlayın</p>
              </div>
            </button>

            {/* Abonelik Onay */}
            <button 
              onClick={() => navigate('/abonelik-onay')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-green-50 rounded-xl w-fit">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Abonelik Onay</h3>
                <p className="text-sm text-slate-500">Bekleyen başvuruları inceleyin</p>
              </div>
            </button>

            {/* Personel Yönetimi */}
            <button 
              onClick={() => navigate('/admin/workers')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-blue-50 rounded-xl w-fit">
                <Users className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Personel Yönetimi</h3>
                <p className="text-sm text-slate-500">Mevcut personelleri düzenleyin</p>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Alt Footer Alanı */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>

    </div>
  );
}