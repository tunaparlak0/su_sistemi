import { useState } from 'react';

export default function Invoices() {
  const [subId, setSubId] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    setMessage('');
    setInvoices([]);
    if (!subId) return;
    
    try {
      const res = await fetch(`http://localhost:3000/invoices/${subId}`);
      const data = await res.json();
      
      if (data.length === 0) {
        setMessage("Bu abonelik numarasına ait fatura bulunamadı.");
      } else {
        setInvoices(data);
      }
    } catch  {
      setMessage("Sistem hatası oluştu.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fatura Sorgulama</h1>
      <div className="flex gap-2 mb-6">
        <input 
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Abonelik No (örn: 5561896)" 
          value={subId}
          onChange={(e) => setSubId(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">Sorgula</button>
      </div>

      {message && <p className="text-red-500 font-bold">{message}</p>}

      {invoices.length > 0 && (
        <table className="w-full border text-center">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">Fatura No</th>
              <th className="p-2">Tutar (TL)</th>
              <th className="p-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="p-2">{inv.id}</td>
                <td className="p-2">{inv.totalPrice}</td>
                <td className="p-2">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}