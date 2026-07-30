import { useState, useEffect } from 'react';

import { Gauge, CheckCircle, X, Clock, Users } from 'lucide-react';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
export default function AdminMeters() {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [subLogs, setSubLogs] = useState([]);
  const [showOldOwners, setShowOldOwners] = useState(false);
 

  // İngilizce aksiyon ve durumları Türkçe'ye çeviren yardımcı fonksiyonlar
  const translateAction = (action) => {
    switch (action) {
      case 'NEW_START': return 'Yeni Başvuru';
      case 'APPROVED': return 'Onaylandı / Aktif';
      case 'CANCELLED': return 'İptal Edildi';
      case 'TRANSFER': return 'Devir / Transfer';
      default: return action;
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Aktif';
      case 'PENDING': return 'Onay Bekliyor';
      case 'CANCELLED': return 'İptal Edildi';
      case 'PASSIVE': return 'Pasif';
      case 'NULL': return 'Boşta';
      default: return status;
    }
  };

  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const res = await fetch('http://localhost:3000/meters', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        if (res.ok) setMeters(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeters();
  }, []);

  const handleOpenModal = async (meter) => {
    setSelectedMeter(meter);
    setSubLogs([]);
    setShowOldOwners(false);

    try {
      const res = await fetch(`http://localhost:3000/subscriptions/logs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const meterSubIds = meter.subscriptions?.map(s => s.id) || [];
        const filtered = data.filter(log => meterSubIds.includes(log.subscriptionId) || log.meterNo === meter.meterNo);
        filtered.sort((a, b) => new Date(b.changedAt || b.createdAt) - new Date(a.changedAt || a.createdAt));
        setSubLogs(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMeters = meters.filter((m) => {
    const matchMeterNo = m.meterNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAddress = m.address && m.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubId = m.subscriptions?.some(sub => sub.id.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchMeterNo || matchAddress || matchSubId;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader/>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Gauge className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Sayaç ve Abonelik Yönetimi</h1>
                <p className="text-sm text-slate-500">Sistemdeki abonelik numaralarını ve sayaç geçmişini inceleyin</p>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Toplam Kayıt: <span className="font-bold text-blue-600">{filteredMeters.length}</span>
            </div>
          </div>

          <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Abonelik numarası, sayaç no veya adres ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Kayıtlar yükleniyor...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Abonelik No</th>
                      <th className="py-4 px-6">Sayaç No</th>
                      <th className="py-4 px-6">Tarife Tipi</th>
                      <th className="py-4 px-6">Adres</th>
                      <th className="py-4 px-6">Durum</th>
                      <th className="py-4 px-6 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredMeters.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-400">Kayıt bulunamadı.</td>
                      </tr>
                    ) : (
                      filteredMeters.map((m) => {
                        const activeSub = m.subscriptions?.find(sub => sub.status === 'ACTIVE' || sub.status === 'PENDING');
                        const mainSub = activeSub || m.subscriptions?.[0];

                        return (
                          <tr key={m.meterNo} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-mono font-bold text-blue-600">
                              {mainSub ? mainSub.id : '-'}
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-800">{m.meterNo}</td>
                            <td className="py-4 px-6 font-semibold text-slate-700">{m.type || '-'}</td>
                            <td className="py-4 px-6 text-slate-600 text-xs max-w-xs truncate">{m.address || '-'}</td>
                            <td className="py-4 px-6">
                              {mainSub?.status === 'ACTIVE' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                  <CheckCircle size={12} /> Aktif
                                </span>
                              ) : mainSub?.status === 'PENDING' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                  Onay Bekliyor
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                  Boşta / Pasif
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleOpenModal(m)}
                                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
                              >
                                Abonelik Geçmişi ({m.subscriptions?.length || 0})
                              </button>
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

      {/* ABONELİK GEÇMİŞİ MODALI */}
      {selectedMeter && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 border border-slate-200 relative animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto">
            <button onClick={() => setSelectedMeter(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-1">Sayaç ve Abonelik Geçmişi</h2>
            <p className="text-xs text-slate-500 mb-4 font-mono">Sayaç No: {selectedMeter.meterNo} | {selectedMeter.address}</p>

            {/* Eski Aboneleri Listele Butonu */}
            <div className="mb-6">
              <button
                onClick={() => setShowOldOwners(!showOldOwners)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all shadow-2xs"
              >
                <Users size={15} className="text-blue-600" />
                {showOldOwners ? "Eski Aboneleri Gizle" : "Eski Aboneleri Listele (Geçmiş Sahipler)"}
              </button>

              {showOldOwners && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-150">
                  <p className="text-xs font-bold text-slate-700">Bu Sayaçta Daha Önce İşlem Yapmış/Oturmuş Kişiler:</p>
                  {subLogs.filter(l => l.user).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Geçmiş abone kaydı bulunamadı.</p>
                  ) : (
                    Array.from(new Set(subLogs.filter(l => l.user).map(l => l.user.id)))
                      .map(userId => {
                        const logItem = subLogs.find(l => l.user?.id === userId);
                        const user = logItem.user;
                        return (
                          <div key={userId} className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center shadow-2xs">
                            <span className="font-semibold text-slate-800">
                              {user.name} {user.surname} 
                              <span className="text-slate-400 font-normal ml-1">
                                (TC/Vergi: {user.idNo || user.taxNo || 'Belirtilmemiş'})
                              </span>
                            </span>
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100">
                              İşlem: {translateAction(logItem.action)}
                            </span>
                          </div>
                        );
                      })
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {selectedMeter.subscriptions?.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">Bu sayaç için kayıtlı abonelik geçmişi bulunmuyor.</p>
              ) : (
                selectedMeter.subscriptions.map((sub) => {
                  const logsForThisSub = subLogs.filter(l => l.subscriptionId === sub.id);
                  const latestLog = logsForThisSub.length > 0 ? logsForThisSub[0] : null;

                  const ownersText = sub.owners?.length > 0 
                    ? sub.owners.map(o => `${o.name} ${o.surname} (TC/Vergi: ${o.idNo || o.taxNo || '-'})`).join(', ')
                    : logsForThisSub.find(l => l.user)?.user 
                      ? `${logsForThisSub.find(l => l.user).user.name} ${logsForThisSub.find(l => l.user).user.surname} (TC/Vergi: ${logsForThisSub.find(l => l.user).user.idNo || logsForThisSub.find(l => l.user).user.taxNo || '-'})`
                      : 'Kayıtsız / Eski Abone';

                  return (
                    <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-blue-600 font-bold">Abonelik ID: {sub.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : sub.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                          {translateStatus(sub.status)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold">Başlangıç Tarihi:</span> {sub.startDate ? new Date(sub.startDate).toLocaleDateString('tr-TR') : '-'}
                      </div>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold">Abone(ler):</span> {ownersText}
                      </div>

                      {/* Son İşlem Durumu (Türkçe) */}
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> Son İşlem Durumu:
                        </p>
                        {!latestLog ? (
                          <p className="text-xs text-slate-400 italic">Bu aboneliğe ait log kaydı bulunmuyor.</p>
                        ) : (
                          <div className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center shadow-2xs">
                            <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                              {translateAction(latestLog.action)}
                            </span>
                            <span className="text-slate-500 font-medium">
                              {new Date(latestLog.changedAt || latestLog.createdAt).toLocaleString('tr-TR')}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedMeter(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>
    </div>
  );
}