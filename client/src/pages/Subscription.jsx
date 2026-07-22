import { useState } from 'react';
import { postSubscription } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Droplets } from 'lucide-react';

export default function Subscription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', surname: '', mail: '', telephone: '', idNo: '', subscriptionId: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postSubscription(formData);
      if (response?.error || response?.message) {
        setErrorMessage(response.error || response.message);
      } else { 
        alert("Başvurunuz başarıyla alındı!"); 
        navigate('/'); 
      }
    } catch {
      setErrorMessage("Bağlantı hatası: Sunucuya ulaşılamıyor.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı (Logo, Başlık ve Navigasyon Butonları) */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            
            {/* Sol: Geri Dön Butonu */}
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <ArrowLeft size={16} /> Geri Dön
            </button>

            {/* Orta: Logo ve Kurum Adı */}
            <div className="flex items-center gap-2 text-blue-900">
              <Droplets size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Su Yönetimi</span>
            </div>

            {/* Sağ: Ana Sayfa Butonu */}
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Ana Sayfa
            </button>

          </div>
        </header>

        {/* Ortadaki Form Kartı */}
        <div className="max-w-xl w-full mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Abonelik Başvurusu</h2>
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input placeholder="Ad" className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <input placeholder="Soyad" className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, surname: e.target.value})} required />
              </div>

              <input type="email" placeholder="E-posta" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
              <input placeholder="Telefon" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
              <input placeholder="TC Kimlik No" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, idNo: e.target.value})} required />
              
              <input 
                placeholder="Abonelik No (Örn:1000001)" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                onChange={(e) => setFormData({...formData, subscriptionId: e.target.value})} 
                required 
              />

              <button type="submit" className="w-full mt-4 p-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md">
                Başvuruyu Tamamla
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alt Footer Alanı */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>

    </div>
  );
}