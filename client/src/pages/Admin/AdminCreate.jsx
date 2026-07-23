import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, ArrowLeft } from 'lucide-react';

export default function AdminCreate() {
  const [formData, setFormData] = useState({ 
    name: '', 
    surname: '', 
    mail: '', 
    telephone: '', 
    role: 'WORKER' 
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Doğru endpoint adresi: /workers (backend router prefix /workers olarak kayıtlı)
      const response = await fetch('http://localhost:3000/workers', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-id': localStorage.getItem('adminId'),
            'x-admin-token': localStorage.getItem('adminToken')
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "İşlem başarısız.");
      }

      // Backend'den dönen özel ID ve token bilgisini alert ile gösteriyoruz
      alert(`Personel başarıyla oluşturuldu!\n\nID: ${result.data?.id}\nŞifre (Token): ${result.data?.token}\nRol: ${formData.role}`);
      navigate('/admin-panel');
    } catch (err) {
      setMessage(err.message || "Sunucuya bağlanılamadı. Backend ayarlarınızı kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            
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

        {/* Ortadaki Form Alanı */}
        <div className="max-w-md w-full mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Yeni Personel Ekle</h2>
            
            {message && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                {message}
              </div>
            )}

            <form onSubmit={handleCreateWorker} className="flex flex-col gap-4">
              <input placeholder="Ad" className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <input placeholder="Soyad" className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, surname: e.target.value})} required />
              <input type="email" placeholder="E-posta" className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
              <input placeholder="Telefon" className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
              
              {/* ROL SEÇİMİ */}
              <select 
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="WORKER">Personel</option>
                <option value="ADMIN">Admin</option>
              </select>

              <button type="submit" className="w-full mt-4 p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                Oluştur
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