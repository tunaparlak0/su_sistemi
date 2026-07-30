import { UserPlus, FileText, Settings, Info } from 'lucide-react';
import { MenuHomeButton } from '../components/MenuHome';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const arrMenu = [
    { 
      title: 'Abonelik Başvurusu', 
      url: '/abonelik-basvuru', 
      description: 'Yeni üyelik işlemlerini başlatın', 
      icon: <UserPlus className="text-blue-600" size={32} /> 
    },
    { 
      title: 'Fatura Görüntüleme', 
      url: '/fatura-goruntuleme', 
      description: 'Güncel borçlarınızı inceleyin', 
      icon: <FileText className="text-blue-600" size={32} /> 
    },
    { 
      title: 'Abonelik İşlemleri', 
      url: '/abonelik-islemleri', 
      description: 'Devir, iptal ve diğer işlemler', 
      icon: <Settings className="text-blue-600" size={32} /> 
    },
    { 
      title: 'Hakkımızda', 
      url: '/about', 
      description: 'Sistem ve kurum hakkında bilgi', 
      icon: <Info className="text-blue-600" size={32} /> 
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header />

        <section className="max-w-5xl mx-auto pt-16 px-6 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Dijital Su Yönetimi
          </h1>
          <p className="text-lg text-slate-600 mb-16 max-w-lg mx-auto">
            Abonelik işlemlerinizi, faturalarınızı ve arıza kayıtlarınızı güvenli bir ortamda yönetin.
          </p>

          {/* Kartlar (2x2 Grid Yapısı) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto mb-16">
            {arrMenu.map((e, index) => (
              <MenuHomeButton 
                key={index} 
                url={e.url}
                title={e.title} 
                description={e.description} 
                icon={e.icon}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}