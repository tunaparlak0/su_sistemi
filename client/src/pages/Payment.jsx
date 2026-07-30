import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3000/invoices/detail/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Fatura bilgileri alınamadı.");
        setInvoice(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceDetail();
  }, [id]);

  // 📌 Kart Numarasını formatlama (Her 4 hanede bir boşluk)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    value = value.substring(0, 16); // Maksimum 16 rakam
    value = value.replace(/(.{4})/g, '$1 ').trim(); // Her 4 hanede bir boşluk bırak
    setCardData({ ...cardData, cardNumber: value });
  };

  // 📌 SKT formatlama (Ay ve yıl arasına otomatik '/' koyma)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Sadece rakamları al
    value = value.substring(0, 4); // Maksimum 4 rakam (AAYY)
    if (value.length >= 3) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    setCardData({ ...cardData, expiryDate: value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // 1. Kart Numarası Kontrolü
    if (cardData.cardNumber.replace(/\s/g, '').length < 16) {
      alert("Lütfen geçerli bir 16 haneli kart numarası giriniz.");
      return;
    }

    // 2. 📌 SKT (Son Kullanma Tarihi) Geçmiş Tarih Kontrolü
    const [monthStr, yearStr] = cardData.expiryDate.split('/');
    if (!monthStr || !yearStr || monthStr.length !== 2 || yearStr.length !== 2) {
      alert("Lütfen geçerli bir son kullanma tarihi giriniz (AA/YY).");
      return;
    }

    const expMonth = parseInt(monthStr, 10);
    const expYear = parseInt('20' + yearStr, 10); // YY kısmını 20YY yapıyoruz (Örn: 27 -> 2027)

    if (expMonth < 1 || expMonth > 12) {
      alert("Geçersiz ay girdiniz.");
      return;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // JavaScript ayları 0'dan başlar (Ocak = 0)
    const currentYear = now.getFullYear();

    // Eğer yıl geçmişse VEYA aynı yıldır ancak ay şimdiki aydan küçükse kartın süresi dolmuştur
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert("Kartınızın son kullanma tarihi geçerli değil (Süresi dolmuş kart).");
      return;
    }

    // 3. Ödeme İşlemini Gerçekleştirme
    executePayment();
  };

  const executePayment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/invoices/${id}/pay`, {
        method: 'PATCH'
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Ödeme işlenemedi.");

      alert("Ödeme başarıyla gerçekleştirildi! Teşekkür ederiz.");
      
      // 📌 Fatura ödendikten sonra direkt fatura görüntüleme sayfasına yönlendiriyoruz
      navigate('/fatura-goruntuleme');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 font-medium text-slate-500">Fatura detayları yükleniyor...</div>;
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 gap-4">
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">{error || "Fatura bulunamadı."}</div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">Geri Dön</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
              <ArrowLeft size={16} /> Geri Dön
            </button>
            <div className="flex items-center gap-2 text-blue-900">
              <ShieldCheck size={26} className="text-blue-600" />
              <span className="font-bold tracking-tight text-lg">SASKİ Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Lock size={14} /> 256-bit SSL
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Sol Taraf: Fatura Özeti */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b">Ödenecek Tutar</h2>
                <div className="text-3xl font-black text-blue-600 mb-4">{invoice.totalPrice} TL</div>
                
                <div className="space-y-2 text-xs text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span>Abone No:</span>
                    <span className="font-mono font-semibold">{invoice.subscriptionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Su Tüketimi:</span>
                    <span className="font-semibold">{invoice.usedWater} m3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Son Ödeme:</span>
                    <span className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-2 text-xs text-blue-800">
                <CheckCircle2 size={16} className="shrink-0 text-blue-600" />
                <span>İşleminiz banka güvenliği güvencesindedir.</span>
              </div>
            </div>

            {/* Sağ Taraf: Kredi Kartı Formu */}
            <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-blue-600" size={24} />
                <h1 className="text-xl font-bold text-slate-900">Kredi / Banka Kartı Bilgileri</h1>
              </div>

              <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kart Üzerindeki Ad Soyad</label>
                  <input
                    type="text"
                    placeholder="ÖRN: AHMET YILMAZ"
                    autoComplete="off"
                    value={cardData.cardHolder}
                    onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Kart Numarası</label>
                  <input
                    type="text"
                    maxLength="19"
                    placeholder="4500 0000 0000 0000"
                    autoComplete="off"
                    value={cardData.cardNumber}
                    onChange={handleCardNumberChange} // 📌 Otomatik boşluk fonksiyonu bağlandı
                    className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Son Kullanma Tarihi</label>
                    <input
                      type="text"
                      maxLength="5"
                      placeholder="AA/YY"
                      autoComplete="off"
                      value={cardData.expiryDate}
                      onChange={handleExpiryChange} // 📌 Otomatik '/' ekleme fonksiyonu bağlandı
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength="3"
                      placeholder="380"
                      autoComplete="new-password"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Güvenli Ödeme Yap ({invoice.totalPrice} TL)
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}