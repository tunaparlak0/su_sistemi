import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ShieldCheck, Home, ArrowLeft, Clock } from 'lucide-react';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:3000/workers/logs');
        const data = await res.json();
        if (res.ok) setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

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
                <History className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Çalışan İşlem Geçmişi</h1>
                <p className="text-sm text-slate-500">Personele ait fatura kesme ve sistem işlem loglarını inceleyin</p>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Toplam İşlem: <span className="font-bold text-blue-600">{logs.length}</span>
            </div>
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
                      <th className="py-4 px-6">Personel</th>
                      <th className="py-4 px-6">Açıklama</th>
                      <th className="py-4 px-6">Tarih / Saat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {logs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-12 text-slate-400">Henüz kayıtlı bir işlem bulunmuyor.</td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200">
                              {log.action}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-800">
                            {log.worker?.user ? `${log.worker.user.name} ${log.worker.user.surname}` : log.workerId}
                          </td>
                          <td className="py-4 px-6 text-slate-600 text-xs">{log.description || '-'}</td>
                          <td className="py-4 px-6 text-xs text-slate-500 flex items-center gap-1.5 pt-5">
                            <Clock size={13} className="text-slate-400" />
                            {new Date(log.changedAt).toLocaleString('tr-TR')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
      </footer>
    </div>
  );
}