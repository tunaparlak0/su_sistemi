import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, Home, ArrowLeft, Mail, Phone, UserCheck, Shield } from 'lucide-react';

export default function AdminWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Personelleri backend'den çekme
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch('http://localhost:3000/workers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-id': localStorage.getItem('adminId'),
            'x-admin-token': localStorage.getItem('adminToken')
          }
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Personel listesi alınamadı.");
        }

        // Backend dizi mi yoksa obje içinde dizi mi dönüyor kontrolü ile güvenli atama
        setWorkers(Array.isArray(result) ? result : result.workers || []);
      } catch (err) {
        setErrorMessage(err.message || "Sunucuya bağlanılamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  // Arama filtresi (Ad veya Soyad üzerinden)
  const filteredWorkers = workers.filter((worker) => {
    const fullName = `${worker.user?.name || ''} ${worker.user?.surname || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Düzenle butonuna tıklandığında çalışacak fonksiyon (İhtiyacınıza göre yönlendirme yapabilirsiniz)
  const handleEdit = (workerId) => {
    // Örnek: navigate(`/admin/workers/edit/${workerId}`);
    console.log("Düzenlenecek personel ID:", workerId);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            {/* Sol: Geri Dön Butonu */}
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <ArrowLeft size={16} /> Geri Dön
            </button>

            {/* Orta: Logo ve Başlık */}
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli</span>
            </div>

            {/* Sağ: Admin Ana Sayfa Butonu */}
            <button 
              onClick={() => navigate('/admin-panel')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Admin Panel
            </button>

          </div>
        </header>

        {/* Ana İçerik Alanı */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Users className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Personel Yönetimi</h1>
                <p className="text-sm text-slate-500">Sistemdeki tüm personel ve yöneticileri görüntüleyin</p>
              </div>
            </div>
            
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Toplam Personel: <span className="font-bold text-blue-600">{filteredWorkers.length}</span>
            </div>
          </div>

          {/* Arama Çubuğu */}
          <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Personel adı veya soyadı ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Hata Mesajı */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 shadow-sm">
              {errorMessage}
            </div>
          )}

          {/* Yükleniyor Durumu */}
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Personeller yükleniyor...</p>
            </div>
          ) : (
            /* Tablo Yapısı */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Personel / ID</th>
                      <th className="py-4 px-6">İletişim</th>
                      <th className="py-4 px-6">Rol</th>
                      <th className="py-4 px-6">Durum</th>
                      <th className="py-4 px-6">Token (Şifre)</th>
                      <th className="py-4 px-6 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredWorkers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-400">
                          Sistemde aramanızla eşleşen personel bulunamadı.
                        </td>
                      </tr>
                    ) : (
                      filteredWorkers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Ad Soyad ve ID */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">
                              {worker.user?.name} {worker.user?.surname}
                            </div>
                            <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mt-1">
                              ID: {worker.id}
                            </div>
                          </td>

                          {/* İletişim Bilgileri */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1">
                              <Mail size={13} className="text-slate-400" /> {worker.user?.mail || '-'}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                              <Phone size={13} className="text-slate-400" /> {worker.user?.telephone || '-'}
                            </div>
                          </td>

                          {/* Rol Rozeti */}
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                              worker.role === 'ADMIN' 
                                ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {worker.role === 'ADMIN' ? <Shield size={12} /> : <UserCheck size={12} />}
                              {worker.role}
                            </span>
                          </td>

                          {/* Durum Rozeti */}
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${
                              worker.status === 'ACTIVE' 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {worker.status}
                            </span>
                          </td>

                          {/* Token */}
                          <td className="py-4 px-6 font-mono text-xs text-slate-600">
                            {worker.token}
                          </td>

                          {/* İşlemler / Düzenle Butonu */}
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleEdit(worker.id)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
                            >
                              Düzenle
                            </button>
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

      {/* Alt Footer Alanı */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>

    </div>
  );
}