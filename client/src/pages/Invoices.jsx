import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileText, Search, X } from 'lucide-react';

export default function Invoices() {
  const navigate = useNavigate();
  const [subId, setSubId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setInvoices([]);
    if (!subId) return;
    
    try {
      const res = await fetch(`http://localhost:3000/invoices/${subId}`);
      const data = await res.json();
      
      if (!res.ok || data.length === 0) {
        setMessage("Bu abonelik numarasına ait fatura bulunamadı.");
      } else {
        setInvoices(data);
      }
    } catch {
      setMessage("Sistem hatası: Sunucuya ulaşılamıyor.");
    }
  };

  const handlePay = async (invoiceId) => {
    try {
      const res = await fetch(`http://localhost:3000/invoices/${invoiceId}/pay`, {
        method: 'PATCH'
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Ödeme işlemi başarısız.");

      alert("Fatura başarıyla ödendi!");
      setInvoices(invoices.map(inv => inv.id === invoiceId ? { ...inv, isPaid: true } : inv));
      setSelectedInvoice({ ...selectedInvoice, isPaid: true });
    } catch (err) {
      alert(err.message);
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
              <FileText size={26} className="text-blue-600" />
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

        <div className="max-w-3xl w-full mx-auto px-4 pt-8 pb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            
            <h1 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Fatura Sorgulama</h1>
            
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <input 
                type="text"
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                placeholder="Abonelik No (Örn: 1000002)" 
                value={subId}
                onChange={(e) => setSubId(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md"
              >
                <Search size={18} /> Sorgula
              </button>
            </form>

            {message && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm font-medium">
                {message}
              </div>
            )}

            {invoices.length > 0 && (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-center border-collapse">
                  <thead className="bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">Fatura Tarihi</th>
                      <th className="p-3 font-semibold">Tutar (TL)</th>
                      <th className="p-3 font-semibold">Durum</th>
                      <th className="p-3 font-semibold">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-medium text-slate-800">
                          {new Date(inv.invoiceDate).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="p-3 font-bold text-blue-600">{inv.totalPrice} TL</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${inv.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {inv.isPaid ? "Ödendi" : "Ödenmedi"}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="bg-slate-100 hover:bg-blue-50 text-blue-600 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors text-xs"
                          >
                            Fatura Detayları
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* RESMİ FATURA GÖRÜNÜMLÜ DETAY MODALI */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
            >
              <X size={18} />
            </button>

            {/* Fatura Başlığı */}
            <div className="flex justify-between items-start border-b pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-blue-900 tracking-tight">SASKİ SU FATURASI</h2>
                <p className="text-xs text-slate-500">Sakarya Su ve Kanalizasyon İdaresi</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedInvoice.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedInvoice.isPaid ? "ÖDENDİ" : "ÖDENMEDİ"}
                </span>
              </div>
            </div>

            {/* Abone ve Adres Bilgileri */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Abone Ad Soyad:</span>
                <span className="font-bold text-slate-800">
                  {selectedInvoice.subscription?.owners?.[0] ? `${selectedInvoice.subscription.owners[0].name} ${selectedInvoice.subscription.owners[0].surname}` : "Bilinmiyor"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Abonelik No:</span>
                <span className="font-mono text-slate-800">{selectedInvoice.subscriptionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Sayaç Numarası:</span>
                <span className="font-mono text-slate-800">{selectedInvoice.subscription?.meterId || "Belirtilmemiş"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Adres:</span>
                <span className="text-slate-800 text-right">{selectedInvoice.subscription?.meter?.address || "Adres bulunamadı"}</span>
              </div>
            </div>

            {/* Fatura Kalemleri Tablosu */}
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-sm">
              <div className="bg-slate-100 px-4 py-2 font-semibold text-slate-700 flex justify-between border-b">
                <span>İşlem / Tüketim Detayı</span>
                <span>Tutar</span>
              </div>
              <div className="px-4 py-3 flex justify-between border-b text-slate-600">
                <span>Su Tüketimi ({selectedInvoice.usedWater} m3 x {selectedInvoice.unitPrice} TL)</span>
                <span>{(selectedInvoice.usedWater * selectedInvoice.unitPrice).toFixed(2)} TL</span>
              </div>
              <div className="px-4 py-3 flex justify-between border-b text-slate-600">
                <span>KDV (% {selectedInvoice.taxRate * 100})</span>
                <span>{(selectedInvoice.totalPrice - (selectedInvoice.usedWater * selectedInvoice.unitPrice)).toFixed(2)} TL</span>
              </div>
              <div className="px-4 py-3 flex justify-between bg-blue-50/50 font-bold text-slate-900 text-base">
                <span>Genç Toplam:</span>
                <span className="text-blue-600">{selectedInvoice.totalPrice} TL</span>
              </div>
            </div>

            {/* Tarih Bilgileri */}
            <div className="flex justify-between text-xs text-slate-500 mb-6 px-1">
              <span>Kesim Tarihi: {new Date(selectedInvoice.invoiceDate).toLocaleDateString('tr-TR')}</span>
              <span>Son Ödeme: {new Date(selectedInvoice.dueDate).toLocaleDateString('tr-TR')}</span>
            </div>

            {/* Butonlar */}
            <div className="flex gap-3">
              {!selectedInvoice.isPaid ? (
                <button
                  onClick={() => handlePay(selectedInvoice.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  Faturayı Öde
                </button>
              ) : (
                <div className="w-full text-center py-3 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200">
                  Bu Fatura Ödenmiştir ✓
                </div>
              )}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Tuna Parlak | SASKİ Su Yönetim Sistemi</p>
          <p className="font-semibold text-slate-700">Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}