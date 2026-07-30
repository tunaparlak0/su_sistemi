import { useState } from 'react';
import {Receipt } from 'lucide-react';
import { createInvoiceApi } from '../../services/api'; // 📌 api.js'den import ediyoruz
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
export default function InvoiceCreate() {
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
      //Console sekmesinde hatanın detayını görebilmek için:
      console.error("Frontend Fatura Hatası:", err);
      alert("Hata Detayı: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader/>

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

      <Footer/>
    </div>
  );
}