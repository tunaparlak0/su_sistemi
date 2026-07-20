import { useNavigate } from 'react-router-dom';
import { UserPlus, CheckCircle, ShieldCheck, Users } from 'lucide-react';

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="text-brand-500" size={32} />
          <h1 className="text-3xl font-bold text-brand-900">Admin Paneli</h1>
        </div>

        {/* Grid yapısını 3 kartı da güzel sığdıracak şekilde güncelledim */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Yeni Admin Ekle */}
          <button 
            onClick={() => navigate('/admin-olustur')}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-500 transition-all text-left flex flex-col gap-4"
          >
            <div className="p-4 bg-brand-50 rounded-xl w-fit">
              <UserPlus className="text-brand-600" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Yeni Admin Ekle</h3>
              <p className="text-sm text-slate-500">Sisteme yeni yönetici tanımlayın</p>
            </div>
          </button>

          {/* Abonelik Onay */}
          <button 
            onClick={() => navigate('/abonelik-onay')}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-500 transition-all text-left flex flex-col gap-4"
          >
            <div className="p-4 bg-green-50 rounded-xl w-fit">
              <CheckCircle className="text-green-600" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Abonelik Onay</h3>
              <p className="text-sm text-slate-500">Bekleyen başvuruları inceleyin</p>
            </div>
          </button>

          {/* Personel Yönetimi (YENİ) */}
          <button 
            onClick={() => navigate('/admin/workers')}
            className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-brand-500 transition-all text-left flex flex-col gap-4"
          >
            <div className="p-4 bg-blue-50 rounded-xl w-fit">
              <Users className="text-blue-600" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Personel Yönetimi</h3>
              <p className="text-sm text-slate-500">Mevcut personelleri düzenleyin</p>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}