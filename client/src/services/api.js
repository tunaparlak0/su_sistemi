const API_URL = "http://localhost:3000";

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const adminId = localStorage.getItem('adminId');
  const adminToken = localStorage.getItem('adminToken');

  if (adminId && adminToken) {
    headers['x-admin-id'] = adminId;
    headers['x-admin-token'] = adminToken;
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

// DİKKAT: Burada 'export' kelimesinin olduğundan emin ol!
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