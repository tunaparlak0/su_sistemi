import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminCreate() {
  // role varsayılan olarak 'WORKER' seçili geldi
  const [formData, setFormData] = useState({ 
    name: '', 
    surname: '', 
    mail: '', 
    telephone: '', 
    role: 'WORKER' 
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/workers/create', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-id': localStorage.getItem('adminId'),
            'x-admin-token': localStorage.getItem('adminToken')
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("İşlem başarısız.");

      const result = await response.json();
      alert(`Personel başarıyla oluşturuldu!\n\nID: ${result.id}\nRol: ${formData.role}`);
      navigate('/admin-panel');
    } catch {
      setMessage("Sunucuya bağlanılamadı. Backend ayarlarınızı kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Yeni Personel Ekle</h2>
        
        {message && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleCreateWorker} className="flex flex-col gap-4">
          <input placeholder="Ad" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input placeholder="Soyad" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, surname: e.target.value})} required />
          <input type="email" placeholder="E-posta" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
          <input placeholder="Telefon" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
          
          {/* ROL SEÇİMİ */}
          <select 
            className="p-3 border rounded-lg w-full bg-white" 
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="WORKER">Personel</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button type="submit" className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Oluştur
          </button>
        </form>
      </div>
    </div>
  );
}