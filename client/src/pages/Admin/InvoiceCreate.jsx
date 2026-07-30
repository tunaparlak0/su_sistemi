import { useState } from 'react';
import { Receipt } from 'lucide-react';
import { createInvoiceApi } from '../../services/api';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
import InvoiceForm from '../../components/InvoiceForm';

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
      console.error("Frontend Fatura Hatası:", err);
      alert("Hata Detayı: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <Receipt className="text-amber-600" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Sayaç Okuma ve Fatura Kesme</h1>
          </div>

          <InvoiceForm 
            subscriptionId={subscriptionId}
            setSubscriptionId={setSubscriptionId}
            usedWater={usedWater}
            setUsedWater={setUsedWater}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}