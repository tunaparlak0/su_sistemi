import { Info, Target, Droplets, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { KurumsalBilgi } from '../components/KurumsalBilgi';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <Header />

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

          {/* İçerik Kartları (Vizyon, Misyon, Güvenilirlik) */}
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

            {/* Güvenilirlik Kartı */}
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
          <KurumsalBilgi/>
        </div>
      </div>

      <Footer />
    </div>
  );
}