import { Users } from "lucide-react";

export function KurumsalBilgi(){
    return <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col gap-6">
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
    
}