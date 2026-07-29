import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserX, Edit3, CheckCircle2 } from 'lucide-react';

const API_URL = "http://localhost:3000";

export default function SubscriptionOperations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('iptal'); // 'iptal', 'guncelle'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State'leri
  const [formData, setFormData] = useState({
    subscriptionId: '',
    idNo: '',
    cancelReason: 'Taşınma / Ev Değişikliği',
    newPhone: '',
    newEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      let endpoint = '';
      let payload = {};

      if (activeTab === 'iptal') {
        endpoint = `${API_URL}/subscriptions/cancel`;
        payload = {
          subscriptionId: formData.subscriptionId,
          idNo: formData.idNo
        };
      } else if (activeTab === 'guncelle') {
        endpoint = `${API_URL}/subscriptions/update-contact`;
        payload = {
          subscriptionId: formData.subscriptionId,
          idNo: formData.idNo,
          telephone: formData.newPhone,
          mail: formData.newEmail
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "İşlem başarısız.");

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ subscriptionId: '', idNo: '', cancelReason: 'Taşınma / Ev Değişikliği', newPhone: '', newEmail: '' });
      }, 4000);

    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <nav className="p-6 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              <ArrowLeft size={20} />
              Ana Sayfaya Dön
            </button>
            <span className="text-sm font-semibold text-slate-500">SASKİ Su Yönetim Sistemi</span>
          </div>
        </nav>

        <section className="max-w-4xl mx-auto pt-12 px-6 mb-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Abonelik İşlemleri
            </h1>
            <p className="text-slate-600">
              Abonelik iptal ve bilgi güncelleme taleplerinizi buradan hızlıca yönetebilirsiniz.
            </p>
          </div>

          {/* 📌 2'ye düşürülen Sekme Butonları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setActiveTab('iptal')}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl font-semibold border transition-all ${
                activeTab === 'iptal'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <UserX size={20} />
              Abonelik İptali
            </button>

            <button
              onClick={() => setActiveTab('guncelle')}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl font-semibold border transition-all ${
                activeTab === 'guncelle'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <Edit3 size={20} />
              Bilgi Güncelleme
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200">
                {errorMessage}
              </div>
            )}

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle2 className="text-emerald-500 w-16 h-16 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">İşleminiz Başarıyla Gerçekleşti!</h3>
                <p className="text-slate-600 max-w-md">
                  Talebiniz sisteme işlenmiş ve ilgili değişiklik otomatik olarak uygulanmıştır.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {activeTab === 'iptal' && 'Abonelik İptal İşlemi'}
                    {activeTab === 'guncelle' && 'İletişim / Bilgi Güncelleme'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Lütfen aşağıdaki bilgileri eksiksiz ve doğru bir şekilde doldurunuz.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Abonelik Numarası</label>
                    <input 
                      type="text" 
                      name="subscriptionId"
                      value={formData.subscriptionId}
                      onChange={handleChange}
                      required
                      placeholder="Örn: 10293847" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">T.C. Kimlik / Vergi No</label>
                    <input 
                      type="text" 
                      name="idNo"
                      value={formData.idNo}
                      onChange={handleChange}
                      required
                      placeholder="11 haneli T.C. Kimlik Numaranız" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800"
                    />
                  </div>
                </div>

                {activeTab === 'iptal' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">İptal Nedeni</label>
                    <select 
                      name="cancelReason"
                      value={formData.cancelReason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 bg-white"
                    >
                      <option>Taşınma / Ev Değişikliği</option>
                      <option>Mülk Satışı</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                )}

                {activeTab === 'guncelle' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Yeni Cep Telefonu</label>
                      <input 
                        type="tel" 
                        name="newPhone"
                        value={formData.newPhone}
                        onChange={handleChange}
                        placeholder="05XX XXX XX XX" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Yeni E-Posta Adresi</label>
                      <input 
                        type="email" 
                        name="newEmail"
                        value={formData.newEmail}
                        onChange={handleChange}
                        placeholder="ornek@mail.com" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800" 
                      />
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-all"
                >
                  İşlemi Gerçekleştir
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
}