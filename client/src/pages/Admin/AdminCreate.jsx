import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkerApi } from '../../services/api';
import Footer from '../../components/Footer';
import AdminHeader from '../../components/AdminHeader';
import AdminCreateForm from '../../components/AdminCreateForm';

export default function AdminCreate() {
  const [formData, setFormData] = useState({ 
    name: '', 
    surname: '', 
    mail: '', 
    telephone: '', 
    idNo: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateWorker = async (e) => {
    e.preventDefault();
    setMessage('');

    if (formData.idNo) {
      const tcRegex = /^\d{11}$/;
      if (!tcRegex.test(formData.idNo)) {
        setMessage("TC Kimlik Numarası tam 11 haneli ve rakamlardan oluşmalıdır.");
        return;
      }
    }

    if (formData.telephone) {
      const phoneRegex = /^05\d{9}$/;
      if (!phoneRegex.test(formData.telephone)) {
        setMessage("Geçerli bir Türkiye telefon numarası giriniz (Örn: 05540232457).");
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.mail)) {
      setMessage("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    try {
      const result = await createWorkerApi(formData);
      const responseData = result.data || result;
      const workerId = responseData.generatedCredentials?.workerId || responseData.worker?.id;
      const password = responseData.generatedCredentials?.password || responseData.worker?.password;

      alert(`Personel başarıyla oluşturuldu!\n\nID: ${workerId}\nŞifre: ${password}\nRol: Rol Atanmadı (NULL)`);
      navigate('/admin-panel');
    } catch (err) {
      setMessage(err.message || "Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        <AdminHeader />
        <div className="max-w-md w-full mx-auto px-4 py-12">
          <AdminCreateForm 
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleCreateWorker}
            message={message}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}