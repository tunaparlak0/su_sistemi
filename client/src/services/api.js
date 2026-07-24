const API_URL = "http://localhost:3000";

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const adminId = localStorage.getItem('adminId');
  const adminPassword = localStorage.getItem('adminPassword'); // 📌 Artık doğru düz metin şifreyi gönderiyoruz

  if (adminId && adminPassword) {
    headers['x-admin-id'] = adminId;
    headers['x-admin-password'] = adminPassword;
  }
  return headers;
};

export const postSubscription = async (data) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getAdminDashboard = async () => {
  const response = await fetch(`${API_URL}/admin/dashboard`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response.json();
};

export const createWorkerApi = async (formData) => {
  const response = await fetch(`${API_URL}/workers`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(formData),
  });
  
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || result.message || "İşlem başarısız.");
  }
  return result;
};

// Personelleri getirme, güncelleme ve silme fonksiyonlarını da api.js'e ekleyelim:
export const getWorkersApi = async () => {
  const response = await fetch(`${API_URL}/workers`, {
    method: 'GET',
    headers: getHeaders(),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Personel listesi alınamadı.");
  return Array.isArray(result) ? result : result.workers || [];
};

export const updateWorkerApi = async (workerId, editFormData) => {
  const response = await fetch(`${API_URL}/workers/${workerId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(editFormData),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Güncelleme başarısız.");
  return result;
};

export const deleteWorkerApi = async (workerId) => {
  const response = await fetch(`${API_URL}/workers/${workerId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Silme işlemi başarısız.");
  return result;
};