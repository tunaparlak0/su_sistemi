import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLoginApi } from '../../services/api';

export default function AdminLogin() {
  const [adminData, setAdminData] = useState({ id: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // api.js'deki fonksiyonu kullanıyoruz
      await adminLoginApi(adminData);
      navigate('/admin-panel');

    } catch (err) {
      setErrorMessage(err.message || "Sunucuya ulaşılamıyor, bağlantı hatası.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-900">Admin Girişi</h2>
        
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
            {errorMessage}
          </div>
        )}

        <input 
          placeholder="Admin ID (Örn: AS1000)" 
          className="p-3 border rounded w-full outline-none focus:ring-2 focus:ring-blue-500" 
          value={adminData.id}
          onChange={(e) => setAdminData({...adminData, id: e.target.value})} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Şifre" 
          className="p-3 border rounded w-full outline-none focus:ring-2 focus:ring-blue-500" 
          value={adminData.password}
          onChange={(e) => setAdminData({...adminData, password: e.target.value})} 
          required 
        />

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded transition-colors shadow-md"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}