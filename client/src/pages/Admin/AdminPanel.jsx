import { useNavigate } from 'react-router-dom';
import { Gauge, UserPlus, CheckCircle, ShieldCheck, Users, Receipt, UserCheck, History } from 'lucide-react';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
export default function AdminPanel() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'WORKER';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader/>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Yeni Admin Ekle (IT ve SUPERADMIN) */}
            {(userRole === 'SUPERADMIN' || userRole === 'IT' || userRole === 'ADMIN') && (
              <button 
                onClick={() => navigate('/admin-olustur')}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
              >
                <div className="p-4 bg-blue-50 rounded-xl w-fit">
                  <UserPlus className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Yeni Admin Ekle</h3>
                  <p className="text-sm text-slate-500">Sisteme yeni yönetici tanımlayın</p>
                </div>
              </button>
            )}

            {/* Abonelik Onay */}
            <button 
              onClick={() => navigate('/abonelik-onay')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-green-50 rounded-xl w-fit">
                <CheckCircle className="text-green-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Abonelik Onay</h3>
                <p className="text-sm text-slate-500">Bekleyen başvuruları inceleyin</p>
              </div>
            </button>

            {/* Personel Yönetimi */}
            {(userRole === 'SUPERADMIN' || userRole === 'IT' || userRole === 'ADMIN') && (
              <button 
                onClick={() => navigate('/admin/workers')}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
              >
                <div className="p-4 bg-blue-50 rounded-xl w-fit">
                  <Users className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Personel Yönetimi</h3>
                  <p className="text-sm text-slate-500">Mevcut personelleri düzenleyin</p>
                </div>
              </button>
            )}

            {/* Fatura Kes / Sayaç Oku */}
            <button 
              onClick={() => navigate('/fatura-olustur')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-amber-50 rounded-xl w-fit">
                <Receipt className="text-amber-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fatura Kes / Sayaç Oku</h3>
                <p className="text-sm text-slate-500">Tüketim girip otomatik fatura oluşturun</p>
              </div>
            </button>

            {/* Kullanıcı Bilgileri */}
            <button 
              onClick={() => navigate('/admin/users')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-indigo-50 rounded-xl w-fit">
                <UserCheck className="text-indigo-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Kullanıcı Bilgileri</h3>
                <p className="text-sm text-slate-500">Sistemdeki tüm aboneleri görüntüleyin</p>
              </div>
            </button>

            {/* İşlem Geçmişi -> Sadece ADMIN göremesin (SUPERADMIN görür) */}
            {userRole !== 'ADMIN' && (
              <button 
                onClick={() => navigate('/admin/logs')}
                className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
              >
                <div className="p-4 bg-purple-50 rounded-xl w-fit">
                  <History className="text-purple-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">İşlem Geçmişi</h3>
                  <p className="text-sm text-slate-500">Personele ait işlem loglarını inceleyin</p>
                </div>
              </button>
            )}

            {/* Sayaç Yönetimi */}
            <button 
              onClick={() => navigate('/admin/meters')}
              className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4"
            >
              <div className="p-4 bg-teal-50 rounded-xl w-fit">
                <Gauge className="text-teal-600" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Sayaç Yönetimi</h3>
                <p className="text-sm text-slate-500">Sayaçları ve abonelik geçmişini inceleyin</p>
              </div>
            </button>

          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}