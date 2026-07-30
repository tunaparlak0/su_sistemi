import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentForm({ totalPrice, onPaymentSuccess }) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Kart Numarasını formatlama (Her 4 hanede bir boşluk)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.substring(0, 16); 
    value = value.replace(/(.{4})/g, '$1 ').trim(); 
    setCardData({ ...cardData, cardNumber: value });
  };

  // SKT formatlama (Ay ve yıl arasına otomatik '/' koyma)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.substring(0, 4); 
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

    // 2. SKT (Son Kullanma Tarihi) Geçmiş Tarih Kontrolü
    const [monthStr, yearStr] = cardData.expiryDate.split('/');
    if (!monthStr || !yearStr || monthStr.length !== 2 || yearStr.length !== 2) {
      alert("Lütfen geçerli bir son kullanma tarihi giriniz (AA/YY).");
      return;
    }

    const expMonth = parseInt(monthStr, 10);
    const expYear = parseInt('20' + yearStr, 10);

    if (expMonth < 1 || expMonth > 12) {
      alert("Geçersiz ay girdiniz.");
      return;
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert("Kartınızın son kullanma tarihi geçerli değil (Süresi dolmuş kart).");
      return;
    }

    // Tüm kontroller geçildiyse üst bileşene bildir
    onPaymentSuccess();
  };

  return (
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
            onChange={handleCardNumberChange}
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
              onChange={handleExpiryChange}
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
          <Lock size={16} /> Güvenli Ödeme Yap ({totalPrice} TL)
        </button>
      </form>
    </div>
  );
}