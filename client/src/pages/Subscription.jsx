import { useState } from 'react';
import { postSubscription } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const navigate = useNavigate();
  // 'address' alanı state'ten kaldırıldı
  const [formData, setFormData] = useState({
    name: '', surname: '', mail: '', telephone: '', idNo: '', meterNo: ''
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
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
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
          
          <input placeholder="Sayaç Numarası (Örn: SK-000001)" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, meterNo: e.target.value})} required />
          
          {/* Adres textarea alanı buradan tamamen kaldırıldı */}

          <button type="submit" className="w-full mt-4 p-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md">
            Başvuruyu Tamamla
          </button>
        </form>
      </div>
    </div>
  );
}