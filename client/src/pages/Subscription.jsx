import { useState } from 'react';
import { postSubscription } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Droplets, ArrowRight } from 'lucide-react';

export default function Subscription() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '', surname: '', mail: '', telephone: '', idNo: '', taxNo: '', subscriptionId: '', meterType: 'EV'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.surname || !formData.mail || !formData.telephone) {
      setErrorMessage("Lütfen tüm kişisel alanları doldurunuz.");
      return;
    }

    if (!formData.idNo && !formData.taxNo) {
      setErrorMessage("Lütfen TC Kimlik Numarası veya Vergi Numarasından en az birini giriniz.");
      return;
    }

    if (formData.idNo) {
      const tcRegex = /^\d{11}$/;
      if (!tcRegex.test(formData.idNo)) {
        setErrorMessage("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
        return;
      }
    }

    if (formData.taxNo) {
      const taxRegex = /^\d{12}$/;
      if (!taxRegex.test(formData.taxNo)) {
        setErrorMessage("Vergi Numarası tam 12 haneli ve rakamlardan oluşmalıdır.");
        return;
      }
    }

    const phoneRegex = /^05\d{9}$/;
    if (!phoneRegex.test(formData.telephone)) {
      setErrorMessage("Geçerli bir Türkiye telefon numarası giriniz (Örn: 05540232457).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setErrorMessage("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.subscriptionId) {
      setErrorMessage("Lütfen abonelik numarasını giriniz.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        surname: formData.surname,
        mail: formData.mail,
        telephone: formData.telephone,
        idNo: formData.idNo || null,
        taxNo: formData.taxNo || null,
        subscriptionId: formData.subscriptionId,
        meterType: formData.meterType // 📌 Seçilen sayaç tipi gönderiliyor
      };

      const response = await postSubscription(payload);
      
      if (response?.error) {
        setErrorMessage(response.error);
      } else { 
        alert("Başvurunuz başarıyla alındı!"); 
        navigate('/'); 
      }
    } catch (err) {
      setErrorMessage(err.message || "Bağlantı hatası: Sunucuya ulaşılamıyor.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <ArrowLeft size={16} /> {step === 2 ? "Geri" : "Geri Dön"}
            </button>
            <div className="flex items-center gap-2 text-blue-900">
              <Droplets size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Su Yönetimi</span>
            </div>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200"
            >
              <Home size={16} /> Ana Sayfa
            </button>
          </div>
        </header>

        <div className="max-w-xl w-full mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-slate-900">Abonelik Başvurusu</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Adım {step} / 2</span>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleNextStep} className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <input placeholder="Ad" value={formData.name} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <input placeholder="Soyad" value={formData.surname} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, surname: e.target.value})} required />
                </div>

                <input type="email" placeholder="E-posta (ornek@mail.com)" value={formData.mail} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
                <input placeholder="Telefon (05XXXXXXXXX)" value={formData.telephone} maxLength={11} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
                
                <div className="flex gap-4">
                  <input placeholder="TC Kimlik No (11 hane)" value={formData.idNo} maxLength={11} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, idNo: e.target.value})} />
                  <input placeholder="Vergi No (12 hane)" value={formData.taxNo} maxLength={12} className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, taxNo: e.target.value})} />
                </div>

                <button type="submit" className="w-full mt-4 p-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md flex items-center justify-center gap-2">
                  Devam Et <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  placeholder="Abonelik No (Örn: 1000001)" 
                  value={formData.subscriptionId}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  onChange={(e) => setFormData({...formData, subscriptionId: e.target.value})} 
                  required 
                />

                {/* 📌 Artık TC girilse bile kullanıcı dilerse Kurumsal seçebilir */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">Tarife / Sayaç Tipi Seçin:</label>
                  <select 
                    value={formData.meterType}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    onChange={(e) => setFormData({...formData, meterType: e.target.value})}
                  >
                    <option value="EV">Mesken (EV)</option>
                    <option value="KOY">Köy (KOY)</option>
                    <option value="KURUMSAL">Kurumsal (KURUMSAL)</option>
                  </select>
                </div>

                <button type="submit" className="w-full mt-4 p-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all shadow-md">
                  Başvuruyu Tamamla
                </button>
              </form>
            )}

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