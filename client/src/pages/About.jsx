import { Info } from 'lucide-react';
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

          {/* Tüm Vizyon, Misyon, Güvenilirlik ve Kurumsal Bilgiler Tek Bileşende */}
          <KurumsalBilgi />
        </div>
      </div>

      <Footer />
    </div>
  );
}