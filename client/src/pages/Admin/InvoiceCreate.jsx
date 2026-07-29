import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, Globe, Receipt } from 'lucide-react';
import { createInvoiceApi } from '../../services/api'; // 📌 api.js'den import ediyoruz

export default function InvoiceCreate() {
  const navigate = useNavigate();
  const [subscriptionId, setSubscriptionId] = useState('');
  const [usedWater, setUsedWater] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createInvoiceApi({ subscriptionId, usedWater });

      const responseData = result.data || result;
      alert("Fatura başarıyla kesildi! Tutar: " + responseData.totalPrice + " TL");
      
      setSubscriptionId('');
      setUsedWater('');
    } catch (err) {
      // 📌 F12 -> Console sekmesinde hatanın detayını görebilmek için:
      console.error("Frontend Fatura Hatası:", err);
      alert("Hata Detayı: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => navigate('/admin-panel')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Admin Ana Sayfa
            </button>

            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Admin Paneli</span>
            </div>

            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Globe size={16} /> Site Ana Sayfa
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <Receipt className="text-amber-600" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Sayaç Okuma ve Fatura Kesme</h1>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Abonelik Numarası:</label>
                <input 
                  type="text" 
                  value={subscriptionId} 
                  onChange={(e) => setSubscriptionId(e.target.value)} 
                  placeholder="Örn: 1000002" 
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800"
                  required 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">Harcanan Su Miktarı (m3):</label>
                <input 
                  type="number" 
                  value={usedWater} 
                  onChange={(e) => setUsedWater(e.target.value)} 
                  placeholder="Örn: 25" 
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800"
                  required 
                />
              </div>

              <button 
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm"
              >
                Fatura Hesapla ve Kes
              </button>

            </form>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}