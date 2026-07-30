import CustomInput from './CustomInput';

export default function AdminCreateForm({ formData, setFormData, onSubmit, message }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Yeni Personel Ekle</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200">
          {message}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <CustomInput 
          placeholder="Ad" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
          required 
        />
        <CustomInput 
          placeholder="Soyad" 
          value={formData.surname}
          onChange={(e) => setFormData({...formData, surname: e.target.value})} 
          required 
        />
        <CustomInput 
          type="email" 
          placeholder="E-posta" 
          value={formData.mail}
          onChange={(e) => setFormData({...formData, mail: e.target.value})} 
          required 
        />
        <CustomInput 
          placeholder="Telefon (05XXXXXXXXX)" 
          maxLength={11}
          value={formData.telephone}
          onChange={(e) => setFormData({...formData, telephone: e.target.value})} 
          required
        />
        <CustomInput 
          placeholder="TC Kimlik Numarası (11 hane)" 
          maxLength={11}
          value={formData.idNo}
          onChange={(e) => setFormData({...formData, idNo: e.target.value})} 
          required
        />

        <button type="submit" className="w-full mt-4 p-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
          Oluştur
        </button>
      </form>
    </div>
  );
}