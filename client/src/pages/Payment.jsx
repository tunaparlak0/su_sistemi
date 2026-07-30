import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const executePayment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/invoices/${id}/pay`, {
        method: 'PATCH'
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Ödeme işlenemedi.");

      alert("Ödeme başarıyla gerçekleştirildi! Teşekkür ederiz.");
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

            {/* Sağ Taraf: Ayrı Bileşene Taşınan Kredi Kartı Formu */}
            <PaymentForm 
              totalPrice={invoice.totalPrice} 
              onPaymentSuccess={executePayment} 
            />

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}