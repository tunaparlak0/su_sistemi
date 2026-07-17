import { useEffect, useState, useCallback } from 'react';

export default function SubscriptionApproval() {
  const [subs, setSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);

  // 1. useCallback ile fonksiyonu sarmalıyoruz. 
  // Bu, bileşen yeniden render olduğunda fonksiyonun yeniden yaratılmamasını sağlar.
 const fetchSubscriptions = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/subscriptions/pending');
      const data = await res.json();
      return data; // Veriyi döndür
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      return [];
    }
  }, []);

  // 2. useEffect artık daha stabil bir fonksiyona sahip
  useEffect(() => {
    let isMounted = true; // Bileşenin hala ekranda olup olmadığını takip eder

    const fetchData = async () => {
      const data = await fetchSubscriptions(); // useCallback'ten dönen veriyi alır
      if (isMounted && data) {
        setSubs(data);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Bileşen kapandığında temizlik yapar
    };
  }, [fetchSubscriptions]);

  const handleApprove = async (id) => {
    await fetch(`http://localhost:3000/subscriptions/approve/${id}`, { method: 'POST' });
    fetchSubscriptions();
  };

  const openDetails = async (id) => {
    const res = await fetch(`http://localhost:3000/subscriptions/${id}`);
    const data = await res.json();
    setSelectedSub(data);
  };

  // ... (Geri kalan render kısmın aynı)
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Bekleyen Abonelikler</h1>
      <div className="grid gap-4">
        {subs.map((sub) => (
          <div key={sub.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
            <div>
              <p className="font-bold">Abonelik No: {sub.id}</p>
              <p className="text-sm text-slate-500">Adres: {sub.address}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openDetails(sub.id)} className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700">Detay</button>
              <button onClick={() => handleApprove(sub.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Onayla</button>
            </div>
          </div>
        ))}
      </div>

      {selectedSub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Başvuru Detayları</h2>
            <p><strong>İsim:</strong> {selectedSub.owners?.[0]?.name} {selectedSub.owners?.[0]?.surname}</p>
            <p><strong>TC/ID No:</strong> {selectedSub.idNo}</p>
            <p><strong>Adres:</strong> {selectedSub.address}</p>
            <button onClick={() => setSelectedSub(null)} className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg">Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}