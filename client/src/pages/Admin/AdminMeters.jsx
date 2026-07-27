import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, ShieldCheck, Home, ArrowLeft, CheckCircle, X } from 'lucide-react';

export default function AdminMeters() {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeter, setSelectedMeter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeters = async () => {
      try {
        const res = await fetch('http://localhost:3000/meters');
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

  const filteredMeters = meters.filter((m) => 
    m.meterNo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.address && m.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <ArrowLeft size={16} /> Geri Dön
            </button>
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli</span>
            </div>
            <button onClick={() => navigate('/admin-panel')} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <Home size={16} /> Admin Panel
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Gauge className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Sayaç ve Abonelik Yönetimi</h1>
                <p className="text-sm text-slate-500">Sistemdeki sayaçları ve geçmiş aboneliklerini inceleyin</p>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Toplam Sayaç: <span className="font-bold text-blue-600">{filteredMeters.length}</span>
            </div>
          </div>

          <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Sayaç numarası veya adres ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Sayaçlar yükleniyor...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Sayaç No</th>
                      <th className="py-4 px-6">Tarife Tipi</th>
                      <th className="py-4 px-6">Adres</th>
                      <th className="py-4 px-6">Aktif Abonelik Durumu</th>
                      <th className="py-4 px-6 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredMeters.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-slate-400">Sayaç bulunamadı.</td>
                      </tr>
                    ) : (
                      filteredMeters.map((m) => {
                        const activeSub = m.subscriptions?.find(sub => sub.status === 'ACTIVE');
                        return (
                          <tr key={m.meterNo} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-mono font-bold text-slate-900">{m.meterNo}</td>
                            <td className="py-4 px-6 font-semibold text-slate-700">{m.type}</td>
                            <td className="py-4 px-6 text-slate-600 text-xs max-w-xs truncate">{m.address || '-'}</td>
                            <td className="py-4 px-6">
                              {activeSub ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                                  <CheckCircle size={12} /> Aktif Abone Var
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                  Boşta / Pasif
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => setSelectedMeter(m)}
                                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
                              >
                                Abonelik Geçmişi
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

            <h2 className="text-xl font-bold text-slate-900 mb-1">Sayaç Abonelik Geçmişi</h2>
            <p className="text-xs text-slate-500 mb-6 font-mono">Sayaç No: {selectedMeter.meterNo} | {selectedMeter.address}</p>

            <div className="space-y-4">
              {selectedMeter.subscriptions?.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">Bu sayaç için kayıtlı abonelik geçmişi bulunmuyor.</p>
              ) : (
                selectedMeter.subscriptions.map((sub) => (
                  <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-blue-600 font-bold">ID: {sub.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold">Başlangıç Tarihi:</span> {new Date(sub.startDate).toLocaleDateString('tr-TR')}
                    </div>
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold">Abone(ler):</span> {sub.owners?.map(o => `${o.name} ${o.surname}`).join(', ') || 'Kayıtsız'}
                    </div>
                  </div>
                ))
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

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
      </footer>
    </div>
  );
}