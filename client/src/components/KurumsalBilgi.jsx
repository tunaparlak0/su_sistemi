import { Users, Target, Droplets, Award } from "lucide-react";

export function KurumsalBilgi() {
  const aboutCards = [
    {
      title: "Vizyonumuz",
      description: "Su kaynaklarının dijital ortamda en verimli şekilde yönetilmesini sağlamak, abonelik ve faturalandırma süreçlerini tamamen şeffaf ve hızlı hale getirmek.",
      icon: <Target size={24} />
    },
    {
      title: "Misyonumuz",
      description: "Vatandaşlarımıza kesintisiz, güvenilir ve modern bir kamu hizmeti sunarak, sayaç okuma ve su yönetiminde teknolojik altyapıyı öncü seviyeye taşımak.",
      icon: <Droplets size={24} />
    },
    {
      title: "Güvenilirlik",
      description: "Gelişmiş veri tabanı altyapısı, güvenli kimlik doğrulama sistemleri ve şeffaf fatura hesaplama modelleri ile tam güvenlik garantisi sunuyoruz.",
      icon: <Award size={24} />
    }
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* 3'lü Kart Grid Yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aboutCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="p-3 bg-blue-50 w-fit rounded-xl text-blue-600">
              {card.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Büyük Kurumsal Bilgi Kutusu */}
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
  );
}