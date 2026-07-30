import { ShieldCheck } from 'lucide-react';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
import AdminMenuGrid from '../../components/AdminMenuGrid';

export default function AdminPanel() {
  const userRole = localStorage.getItem('userRole') || 'WORKER';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader />

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-slate-900">Yönetim Paneli</h1>
          </div>

          {/* Menü Kartları Bileşene Taşındı */}
          <AdminMenuGrid userRole={userRole} />
        </div>
      </div>

      <Footer />
    </div>
  );
}