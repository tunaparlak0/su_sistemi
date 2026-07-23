import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, ArrowLeft, CheckCircle2, FileText, User, X } from 'lucide-react';

export default function SubscriptionApproval() {
  const [subs, setSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Admin kimlik bilgileriyle abonelikleri çekme
  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/subscriptions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-id': localStorage.getItem('adminId'),
          'x-admin-token': localStorage.getItem('adminToken')
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Abonelikler alınamadı.");
      
      // Sadece PENDING (bekleyen) abonelikleri filtreleyelim
      const pendingList = Array.isArray(data) 
        ? data.filter(sub => sub.status === 'PENDING') 
        : (data.subscriptions || []).filter(sub => sub.status === 'PENDING');

      setSubs(pendingList);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      setErrorMessage(error.message);
      setSubs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await fetchSubscriptions();
      if (!isMounted) return;
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchSubscriptions]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/subscriptions/approve/${id}`, { 
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json' -> SİLDİK çünkü body göndermiyoruz!
          'x-admin-id': localStorage.getItem('adminId'),
          'x-admin-token': localStorage.getItem('adminToken')
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Onaylama işlemi başarısız.");

      alert("Abonelik başarıyla onaylandı!");
      fetchSubscriptions(); // Listeyi yenile
    } catch (err) {
      alert(err.message);
    }
  };

 const openDetails = (sub) => {
    setSelectedSub(sub);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <ArrowLeft size={16} /> Geri Dön
            </button>

            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli</span>
            </div>

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
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <CheckCircle2 className="text-emerald-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Bekleyen Abonelik Başvuruları</h1>
                <p className="text-sm text-slate-500">Onay bekleyen su aboneliği başvurularını inceleyin</p>
              </div>
            </div>
            
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Bekleyen Başvuru: <span className="font-bold text-emerald-600">{subs.length}</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 shadow-sm">
              {errorMessage}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Başvurular yükleniyor...</p>
            </div>
          ) : subs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-400 font-medium">Onay bekleyen abonelik başvurusu bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {subs.map((sub) => {
                const owner = sub.owners?.[0];
                return (
                  <div key={sub.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center hover:shadow-md transition-shadow">
                    <div>
                      <p className="font-bold text-slate-900 flex items-center gap-2">
                        <FileText size={16} className="text-emerald-600" /> Abonelik No: {sub.id}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Başvuran: <span className="font-semibold text-slate-700">{owner ? `${owner.name} ${owner.surname}` : 'Bilinmiyor'}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
  onClick={() => openDetails(sub)} 
  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-slate-200"
>
  Detay
</button>
                      <button 
                        onClick={() => handleApprove(sub.id)} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                      >
                        Onayla
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detay Modalı */}
      {selectedSub && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedSub(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-emerald-600" /> Başvuru Detayları
            </h2>
            
            <div className="space-y-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p><strong>Abonelik ID:</strong> {selectedSub.id}</p>
              <p><strong>İsim Soyisim:</strong> {selectedSub.owners?.[0]?.name} {selectedSub.owners?.[0]?.surname || '-'}</p>
              <p><strong>TC/ID No:</strong> {selectedSub.owners?.[0]?.idNo || 'Belirtilmemiş'}</p>
              <p><strong>E-posta:</strong> {selectedSub.owners?.[0]?.mail || '-'}</p>
              <p><strong>Telefon:</strong> {selectedSub.owners?.[0]?.telephone || '-'}</p>
              <p><strong>Sayaç ID:</strong> {selectedSub.meterId || 'Atanmamış'}</p>
            </div>

            <button 
              onClick={() => setSelectedSub(null)} 
              className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl text-sm font-bold transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

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