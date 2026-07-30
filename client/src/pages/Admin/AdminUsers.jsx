import { useState, useEffect } from 'react';
import { UserCheck, Mail, Phone } from 'lucide-react';
import { getUsersApi } from '../../services/api'; // 📌 api.js'den import ediyoruz
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Artık getUsersApi kullanarak güvenli şekilde token gönderiyoruz
        const data = await getUsersApi();
        setUsers(data);
      } catch (err) {
        console.error("Kullanıcılar alınamadı:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

    const filteredUsers = users.filter((u) => {
      const fullName = `${u.name} ${u.surname}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || (u.mail && u.mail.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <div>
         <AdminHeader/>

          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <UserCheck className="text-blue-600" size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Kullanıcı Bilgileri</h1>
                  <p className="text-sm text-slate-500">Sisteme kayıtlı tüm aboneleri ve vatandaşları görüntüleyin</p>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                Toplam Kullanıcı: <span className="font-bold text-blue-600">{filteredUsers.length}</span>
              </div>
            </div>

            <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <input
                type="text"
                placeholder="Ad, soyad veya e-posta ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {loading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 font-medium">Kullanıcılar yükleniyor...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                        <th className="py-4 px-6">Ad Soyad</th>
                        <th className="py-4 px-6">İletişim</th>
                        <th className="py-4 px-6">TC / Vergi No</th>
                        <th className="py-4 px-6">Abonelik Bilgisi</th>
                        <th className="py-4 px-6">Sayaç No</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-12 text-slate-400">Kullanıcı bulunamadı.</td>
                        </tr>
                      ) : (
                        filteredUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-4 px-6 font-bold text-slate-900">{u.name} {u.surname}</td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-1"><Mail size={13} className="text-slate-400" /> {u.mail || '-'}</div>
                              <div className="flex items-center gap-1.5 text-slate-600 text-xs"><Phone size={13} className="text-slate-400" /> {u.telephone || '-'}</div>
                            </td>
                            <td className="py-4 px-6 font-mono text-xs text-slate-600">{u.idNo || u.taxNo || '-'}</td>
                            
                            {/*Abonelik ID ve Durum Rozeti */}
                            <td className="py-4 px-6">
                              {u.subscription ? (
                                <div className="flex flex-col gap-1">
                                  <span className="font-mono text-xs text-blue-600 font-semibold">{u.subscription.id}</span>
                                  {u.subscription.status === 'ACTIVE' && (
                                    <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                      Aktif
                                    </span>
                                  )}
                                  {u.subscription.status === 'PENDING' && (
                                    <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                                      Onay Bekliyor
                                    </span>
                                  )}
                                  {(!u.subscription.status || u.subscription.status === 'NULL') && (
                                    <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                      -
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-slate-400">Abone Değil</span>
                              )}
                            </td>

                            <td className="py-4 px-6 font-mono text-xs text-slate-600">{u.subscription?.meterId || '-'}</td>
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
        <Footer/>
      </div>
    );
  }