const API_URL = "http://localhost:3000";

const getAuthHeaders = (hasBody = false) => {
  const headers = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  
  // Sadece JWT token gönderilir, şifreler asla localStorage'da tutulmaz!
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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

export const adminLoginApi = async (credentials) => {
  const response = await fetch(`${API_URL}/admin-login-secret`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || result.message || "Giriş başarısız.");
  
  if (result.token) {
    // LocalStorage'da sadece token ve rol tutulur (Güvenli yaklaşım)
    localStorage.setItem('token', result.token);
    localStorage.setItem('userRole', result.user?.role || 'SUPERADMIN');
  }
  return result;
};

export const createWorkerApi = async (formData) => {
  const response = await fetch(`${API_URL}/workers`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(formData),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || result.message || "İşlem başarısız.");
  return result;
};
export const getUsersApi = async () => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: getAuthHeaders(false), // 📌 Token'ı otomatik ekler
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Kullanıcılar alınamadı.");
  return Array.isArray(result) ? result : result.users || [];
};
export const getWorkersApi = async () => {
  const response = await fetch(`${API_URL}/workers`, {
    method: 'GET',
    headers: getAuthHeaders(false),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Personel listesi alınamadı.");
  return Array.isArray(result) ? result : result.workers || [];
};

export const updateWorkerApi = async (workerId, editFormData) => {
  const response = await fetch(`${API_URL}/workers/${workerId}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(editFormData),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Güncelleme başarısız.");
  return result;
};

export const createInvoiceApi = async (invoiceData) => {
  const response = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(invoiceData),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || result.message || "Fatura oluşturulamadı.");
  return result;
};
export const getSubscriptionsApi = async () => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'GET',
    headers: getAuthHeaders(false),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Abonelikler alınamadı.");
  return result;
};

export const approveSubscriptionApi = async (id) => {
  const response = await fetch(`${API_URL}/subscriptions/approve/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(false),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Onaylama işlemi başarısız.");
  return result;
};