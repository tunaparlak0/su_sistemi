import { useNavigate } from 'react-router-dom';
import { UserPlus, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-brand-500" size={32} />
          <h1 className="text-3xl font-bold text-brand-900">Admin Paneli</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Oluşturma Butonu */}
          <button 
            onClick={() => navigate('/admin-olustur')}
            className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-500 transition-all text-left flex items-center gap-4"
          >
            <div className="p-4 bg-brand-50 rounded-xl">
              <UserPlus className="text-brand-600" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Yeni Admin Ekle</h3>
              <p className="text-sm text-slate-500">Sisteme yeni bir yönetici tanımlayın</p>
            </div>
          </button>

          {/* Abonelik Onay Butonu */}
          <button 
            onClick={() => navigate('/abonelik-onay')}
            className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-500 transition-all text-left flex items-center gap-4"
          >
            <div className="p-4 bg-green-50 rounded-xl">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Abonelik Onay</h3>
              <p className="text-sm text-slate-500">Bekleyen başvuruları inceleyin</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}