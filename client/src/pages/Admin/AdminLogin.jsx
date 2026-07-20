import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [adminData, setAdminData] = useState({ id: '', token: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem('adminId', adminData.id);
    localStorage.setItem('adminToken', adminData.token);
    navigate('/admin-panel'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Admin Girişi</h2>
        
        <input 
          placeholder="Admin ID" 
          className="p-3 border rounded w-full" 
          onChange={(e) => setAdminData({...adminData, id: e.target.value})} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Token (Şifre)" 
          className="p-3 border rounded w-full" 
          onChange={(e) => setAdminData({...adminData, token: e.target.value})} 
          required 
        />

        {/* GİRİŞ YAP BUTONU BURADA - İÇERİĞİ EKLENDİ */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded transition-colors"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}