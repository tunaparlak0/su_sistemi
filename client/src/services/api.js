const API_URL = "http://localhost:3000";

// Genel yardımcı fonksiyon (Admin tokenlarını otomatik ekler)
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

// Abonelik Başvurusu
export const postSubscription = async (data) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Admin Paneli İçin Örnek İstek (Dashboard verilerini çeker)
export const getAdminDashboard = async () => {
  const response = await fetch(`${API_URL}/admin/dashboard`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response.json();
};