import { X, Check } from 'lucide-react';
import CustomInput from './CustomInput';

export default function WorkerEditModal({ 
  isEditing, 
  selectedWorker, 
  editFormData, 
  setEditFormData, 
  onClose, 
  onSubmit 
}) {
  if (!isEditing || !selectedWorker) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-1">Personel Düzenle</h2>
        <p className="text-xs text-slate-500 mb-6">{selectedWorker.user?.name} {selectedWorker.user?.surname} ({selectedWorker.id})</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <CustomInput 
            label="E-posta"
            type="email"
            value={editFormData.mail}
            onChange={(e) => setEditFormData({ ...editFormData, mail: e.target.value })}
            required
          />

          <CustomInput 
            label="Telefon"
            type="text"
            value={editFormData.telephone}
            onChange={(e) => setEditFormData({ ...editFormData, telephone: e.target.value })}
          />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-600">Rol</label>
            <select
              value={editFormData.role}
              onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
              className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="WORKER">İşçi</option>
              <option value="IT">IT</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-600">Durum</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Check size={16} /> Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}