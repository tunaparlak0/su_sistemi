// client/src/pages/Admin/AdminCreate.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminCreate() {
  const [formData, setFormData] = useState({ name: '', surname: '', mail: '', telephone: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users/create-admin', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-admin-id': localStorage.getItem('adminId'),
            'x-admin-token': localStorage.getItem('adminToken')
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Sunucudan yanıt alınamadı.");

      const result = await response.json();
      alert(`Admin başarıyla oluşturuldu!\n\nID: ${result.adminId}\nToken: ${result.token}`);
      navigate('/admin-panel');
    } catch {
      setMessage("Sunucuya bağlanılamadı. Lütfen backend'in çalışıp çalışmadığını kontrol edin.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Yeni Admin Ekle</h2>
        
        {message && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleCreateAdmin} className="flex flex-col gap-4">
          <input placeholder="Ad" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <input placeholder="Soyad" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, surname: e.target.value})} required />
          <input type="email" placeholder="E-posta" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, mail: e.target.value})} required />
          <input placeholder="Telefon" className="p-3 border rounded-lg w-full" onChange={(e) => setFormData({...formData, telephone: e.target.value})} required />
          
          {/* OLUŞTUR BUTONU BURADA */}
          <button type="submit" className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Oluştur
          </button>
        </form>
      </div>
    </div>
  );
}