import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, FileText, Search } from 'lucide-react';

export default function Invoices() {
  const navigate = useNavigate();
  const [subId, setSubId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {/* Üst Header Alanı */}
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

        {/* Ana İçerik Alanı */}
        <div className="max-w-2xl w-full mx-auto px-4 pt-8 pb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            
            <h1 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Fatura Sorgulama</h1>
            
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <input 
                type="text"
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                placeholder="Abonelik No (Örn: 1000001)" 
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
                      <th className="p-3 font-semibold">Fatura No</th>
                      <th className="p-3 font-semibold">Tutar (TL)</th>
                      <th className="p-3 font-semibold">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-medium text-slate-800">{inv.id.slice(0, 8)}...</td>
                        <td className="p-3 font-bold text-blue-600">{inv.totalPrice} TL</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${inv.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {inv.isPaid ? "Ödendi" : "Ödenmedi"}
                          </span>
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