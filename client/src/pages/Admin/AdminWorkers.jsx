import { useState, useEffect } from 'react';
import { Users, ShieldCheck, Mail, Phone, UserCheck, Shield } from 'lucide-react';
import { getWorkersApi, updateWorkerApi } from '../../services/api';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
import WorkerEditModal from '../../components/WorkerEditModal';

export default function AdminWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Düzenleme Modalı için State'ler
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [editFormData, setEditFormData] = useState({
    mail: '',
    telephone: '',
    role: 'WORKER',
    status: 'ACTIVE'
  });

  // 📌 Veri çekme fonksiyonunu bağımsız bir yardımcı fonksiyon yapıyoruz
  const fetchWorkersList = async () => {
    try {
      setLoading(true);
      const data = await getWorkersApi();
      setWorkers(data);
    } catch (err) {
      setErrorMessage(err.message || "Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 useEffect içerisine doğrudan async bir fonksiyon yazarak linter uyarılarını kesiyoruz
  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setLoading(true);
        const data = await getWorkersApi();
        if (isMounted) setWorkers(data);
      } catch (err) {
        if (isMounted) setErrorMessage(err.message || "Sunucuya bağlanılamadı.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredWorkers = workers.filter((worker) => {
    const fullName = `${worker.user?.name || ''} ${worker.user?.surname || ''}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleOpenEdit = (worker) => {
    setSelectedWorker(worker);
    setEditFormData({
      mail: worker.user?.mail || '',
      telephone: worker.user?.telephone || '',
      role: worker.role || 'WORKER',
      status: worker.status || 'ACTIVE'
    });
    setIsEditing(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWorkerApi(selectedWorker.id, editFormData);
      alert("Personel başarıyla güncellendi.");
      setIsEditing(false);
      fetchWorkersList();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Users className="text-blue-600" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Personel Yönetimi</h1>
                <p className="text-sm text-slate-500">Sistemdeki tüm personel ve yöneticileri görüntüleyin</p>
              </div>
            </div>
            <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              Toplam Personel: <span className="font-bold text-blue-600">{filteredWorkers.length}</span>
            </div>
          </div>

          <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <input
              type="text"
              placeholder="Personel adı veya soyadı ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
            />
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 shadow-sm">
              {errorMessage}
            </div>
          )}

          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">Personeller yükleniyor...</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Personel / ID</th>
                      <th className="py-4 px-6">İletişim</th>
                      <th className="py-4 px-6">Rol</th>
                      <th className="py-4 px-6">Durum</th>
                      <th className="py-4 px-6">TC Kimlik No</th>
                      <th className="py-4 px-6 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredWorkers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-slate-400">
                          Sistemde aramanızla eşleşen personel bulunamadı.
                        </td>
                      </tr>
                    ) : (
                      filteredWorkers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-900">{worker.user?.name} {worker.user?.surname}</div>
                            <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit mt-1">ID: {worker.id}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1"><Mail size={13} className="text-slate-400" /> {worker.user?.mail || '-'}</div>
                            <div className="flex items-center gap-1.5 text-slate-600 text-xs"><Phone size={13} className="text-slate-400" /> {worker.user?.telephone || '-'}</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                              worker.role === 'ADMIN' 
                                ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                                : worker.role === 'IT'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              {worker.role === 'ADMIN' && <Shield size={12} />}
                              {worker.role === 'IT' && <ShieldCheck size={12} />}
                              {worker.role === 'WORKER' && <UserCheck size={12} />}
                              {worker.role === 'WORKER' ? 'İşçi' : worker.role === 'IT' ? 'IT' : worker.role}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${worker.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                              {worker.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-mono text-xs text-slate-600">{worker.user?.idNo || '-'}</td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => handleOpenEdit(worker)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
                            >
                              Düzenle
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <WorkerEditModal 
        isEditing={isEditing}
        selectedWorker={selectedWorker}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        onClose={() => setIsEditing(false)}
        onSubmit={handleUpdateSubmit}
      />

      <Footer />
    </div>
  );
}