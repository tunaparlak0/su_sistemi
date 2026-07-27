import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, Info, Droplets, Award, Users, Target } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Ana Sayfa
            </button>

            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Su Yönetimi</span>
            </div>

            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              Geri Dön
            </button>
          </div>
        </header>

        {/* Ana İçerik Alanı */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          
          {/* Başlık Bölümü */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Info className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Hakkımızda</h1>
              <p className="text-sm text-slate-500">Sistemimiz ve vizyonumuz hakkında detaylı bilgi</p>
            </div>
          </div>

          {/* İçerik Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Vizyon Kartı */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Vizyonumuz</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Su kaynaklarının dijital ortamda en verimli şekilde yönetilmesini sağlamak, abonelik ve faturalandırma süreçlerini tamamen şeffaf ve hızlı hale getirmek.
              </p>
            </div>

            {/* Misyon Kartı */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600">
                <Droplets size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Misyonumuz</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vatandaşlarımıza kesintisiz, güvenilir ve modern bir kamu hizmeti sunarak, sayaç okuma ve su yönetiminde teknolojik altyapıyı öncü seviyeye taşımak.
              </p>
            </div>

            {/* Kalite Kartı */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Güvenilirlik</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gelişmiş veri tabanı altyapısı, güvenli kimlik doğrulama sistemleri ve şeffaf fatura hesaplama modelleri ile tam güvenlik garantisi sunuyoruz.
              </p>
            </div>

          </div>

          {/* Kurumsal Bilgi Kutusu */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users size={20} className="text-blue-600" /> SASKİ Dijital Su Yönetim Sistemi Hakkında
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Bu platform; abonelik başvurularından anlık fatura takibine, sayaç okuma operasyonlarından personel yetkilendirmelerine kadar tüm su yönetim süreçlerini tek bir merkezden koordine etmek amacıyla geliştirilmiştir. Modern web teknolojileri kullanılarak hazırlanan sistemimiz, hem abonelerimiz için kullanıcı dostu bir deneyim hem de yöneticilerimiz için güçlü bir kontrol paneli sunar.
            </p>
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between text-xs text-slate-500 gap-2">
              <span>Geliştirici: Tuna Parlak</span>
              <span>Proje: SASKİ Su Yönetim Sistemi (2026)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Alt Footer Alanı */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}