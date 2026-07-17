import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [adminData, setAdminData] = useState({ id: '', token: '' });
  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();
    // Burada API ile token doğrulama yapabilirsin
    localStorage.setItem('adminId', adminData.id);
    localStorage.setItem('adminToken', adminData.token);
    
    // Başarıyla login olduysa panele at
    navigate('/admin-panel'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Admin Girişi</h2>
        <input placeholder="Admin ID" className="p-3 border rounded" onChange={(e) => setAdminData({...adminData, id: e.target.value})} required />
        <input type="password" placeholder="Token (Şifre)" className="p-3 border rounded" onChange={(e) => setAdminData({...adminData, token: e.target.value})} required />
        <button className="bg-brand-500 text-white p-3 rounded">Giriş Yap</button>
      </form>
    </div>
  );
}