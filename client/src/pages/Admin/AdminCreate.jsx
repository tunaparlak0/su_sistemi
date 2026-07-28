import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Home, ArrowLeft } from 'lucide-react';
import { createWorkerApi } from '../../services/api';

export default function AdminCreate() {
  const [formData, setFormData] = useState({ 
    name: '', 
    surname: '', 
    mail: '', 
    telephone: '', 
    idNo: ''
    // 📌 'role' alanını buradan kaldırdık
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.idNo) {
      const tcRegex = /^\d{11}$/;
      if (!tcRegex.test(formData.idNo)) {
        setMessage("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
        return;
      }
    }

    if (formData.telephone) {
      const phoneRegex = /^05\d{9}$/;
      if (!phoneRegex.test(formData.telephone)) {
        setMessage("Geçerli bir Türkiye telefon numarası giriniz (Örn: 05540232457).");
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setMessage("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    try {
      const result = await createWorkerApi(formData);
      const responseData = result.data || result;
      const workerId = responseData.generatedCredentials?.workerId || responseData.worker?.id;
      const password = responseData.generatedCredentials?.password || responseData.worker?.password;

      alert(`Personel başarıyla oluşturuldu!\n\nID: ${workerId}\nŞifre: ${password}\nRol: Rol Atanmadı (NULL)`);
      navigate('/admin-panel');
    } catch (err) {
      setMessage(err.message || "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
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

        <div className="max-w-md w-full mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Yeni Personel Ekle</h2>
            
            {message && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
                {message}
              </div>
            )}

            <form onSubmit={handleCreateWorker} className="flex flex-col gap-4">
              <input 
                placeholder="Ad" 
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <input 
                placeholder="Soyad" 
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, surname: e.target.value})} 
                required 
              />
              <input 
                type="email" 
                placeholder="E-posta" 
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, mail: e.target.value})} 
                required 
              />
              <input 
                placeholder="Telefon (05XXXXXXXXX)" 
                maxLength={11}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
                required
              />
              <input 
                placeholder="TC Kimlik Numarası (11 hane)" 
                maxLength={11}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, idNo: e.target.value})} 
                required
              />

              {/* 📌 Rol seçme select kutusu buradan kaldırıldı. */}

              <button type="submit" className="w-full mt-4 p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                Oluştur
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