import { useState, useEffect } from 'react';
import { History, Clock, FileText, Search } from 'lucide-react';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';

export default function AdminLogs() {
  const [activeTab, setActiveTab] = useState('worker'); // 'worker' veya 'subscription'
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // 🔍 Arama kelimesi için state

  // İngilizce aksiyonları Türkçe'ye çeviren yardımcı fonksiyon
  const translateAction = (action) => {
    switch (action) {
      case 'CREATE_WORKER': return 'Personel Oluşturuldu';
      case 'UPDATE_WORKER': return 'Personel Güncellendi';
      case 'APPROVE_SUBSCRIPTION': return 'Abonelik Onaylandı';
      case 'CREATE_INVOICE': return 'Fatura Kesildi';
      case 'NEW_START': return 'Yeni Başvuru';
      case 'APPROVED': return 'Abonelik Aktifleştirildi';
      case 'CANCELLED': return 'Abonelik İptal Edildi';
      case 'TRANSFER': return 'Devir / Transfer';
      default: return action;
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadLogs() {
      try {
        if (isMounted) setLoading(true);
        
        const endpoint = activeTab === 'worker' 
          ? 'http://localhost:3000/workers/logs' 
          : 'http://localhost:3000/subscriptions/logs';

        const res = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await res.json();
        
        if (isMounted) {
          if (res.ok) {
            setLogs(Array.isArray(data) ? data : []);
          } else {
            setLogs([]);
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setLogs([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLogs();

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  // 🔍 Arama Filtreleme Mantığı
  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    
    // İşlem türünün Türkçesini veya İngilizcesini aramaya dahil et
    const translated = translateAction(log.action).toLowerCase();
    const actionMatch = log.action.toLowerCase().includes(term) || translated.includes(term);
    
    // Açıklama veya ID eşleşmesi
    const description = activeTab === 'worker' 
      ? (log.description || '').toLowerCase()
      : `${log.subscriptionId || ''} ${log.meterNo || ''}`.toLowerCase();
      
    // Personel adı eşleşmesi (Worker logları için)
    const workerName = log.worker?.user 
      ? `${log.worker.user.name} ${log.worker.user.surname}`.toLowerCase() 
      : (log.workerId || '').toLowerCase();

    return actionMatch || description.includes(term) || workerName.includes(term);
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader/>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <History className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Sistem İşlem Geçmişi</h1>
                <p className="text-sm text-slate-500">Personel ve abonelik hareketlerini inceleyin</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* 🔍 Arama Inputu */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="İşlem türü veya personel ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm whitespace-nowrap">
                Kayıt: <span className="font-bold text-blue-600">{filteredLogs.length}</span>
              </div>
            </div>
          </div>

          {/* Sekme Butonları */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => { setActiveTab('worker'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border ${
                activeTab === 'worker'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <History size={18} /> Personel Logları
            </button>
            <button
              onClick={() => { setActiveTab('subscription'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border ${
                activeTab === 'subscription'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <FileText size={18} /> Abonelik Logları
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Loglar yükleniyor...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">İşlem Türü</th>
                      <th className="py-4 px-6">{activeTab === 'worker' ? 'Personel' : 'İlgili Abone / Sayaç'}</th>
                      <th className="py-4 px-6">Açıklama</th>
                      <th className="py-4 px-6">Tarih / Saat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-12 text-slate-400">Aradığınız kriterlere uygun kayıt bulunamadı.</td>
                      </tr>
                    ) : (
                      filteredLogs.map((log) => {
                        const descriptionText = activeTab === 'worker' 
                          ? (log.description || '-')
                          : `${log.subscriptionId || 'Bilinmeyen'} numaralı abonelik ve ${log.meterNo || '-'} numaralı sayaç üzerinde işlem gerçekleştirildi.`;

                        return (
                          <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                                {translateAction(log.action)}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold text-slate-800">
                              {activeTab === 'worker' 
                                ? (log.worker?.user ? `${log.worker.user.name} ${log.worker.user.surname}` : log.workerId)
                                : (log.subscriptionId ? `Abonelik: ${log.subscriptionId}` : 'Sistem')}
                            </td>
                            <td className="py-4 px-6 text-slate-600 text-xs">{descriptionText}</td>
                            <td className="py-4 px-6 text-xs text-slate-500 flex items-center gap-1.5 pt-5">
                              <Clock size={13} className="text-slate-400" />
                              {new Date(log.changedAt || log.createdAt).toLocaleString('tr-TR')}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}