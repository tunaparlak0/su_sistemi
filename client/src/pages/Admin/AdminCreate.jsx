import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkerApi } from '../../services/api';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
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
        <AdminHeader/>

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

      <Footer/>
    </div>
  );
}