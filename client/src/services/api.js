const API_URL = "http://localhost:3000";

const getAuthHeaders = (hasBody = false) => {
  const headers = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    let result;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      result = {};
    }

    if (!response.ok) {
      throw new Error(result.error || result.message || "İşlem gerçekleştirilemedi.");
    }

    return result;
  } catch (err) {
    // 📌 Burada orijinal hatayı 'cause' olarak ekliyoruz ki linter / modern JS uyarı vermesin
    if (err.message === "Failed to fetch" || err.name === "TypeError") {
      throw new Error("Sunucuya şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyin.", { cause: err });
    }
    throw new Error(err.message, { cause: err });
  }
}
export const postSubscription = async (data) => {
  return request('/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const adminLoginApi = async (credentials) => {
  const result = await request('/admin-login-secret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (result.token) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('userRole', result.user?.role || 'SUPERADMIN');
  }
  return result;
};

export const createWorkerApi = async (formData) => {
  return request('/workers', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(formData),
  });
};

export const getUsersApi = async () => {
  const result = await request('/users', {
    method: 'GET',
    headers: getAuthHeaders(false),
  });
  return Array.isArray(result) ? result : result.users || [];
};

export const getWorkersApi = async () => {
  const result = await request('/workers', {
    method: 'GET',
    headers: getAuthHeaders(false),
  });
  return Array.isArray(result) ? result : result.workers || [];
};

export const updateWorkerApi = async (workerId, editFormData) => {
  return request(`/workers/${workerId}`, {
    method: 'PUT',
    headers: getAuthHeaders(true),
    body: JSON.stringify(editFormData),
  });
};

export const createInvoiceApi = async (invoiceData) => {
  return request('/invoices', {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(invoiceData),
  });
};

export const getSubscriptionsApi = async () => {
  return request('/subscriptions', {
    method: 'GET',
    headers: getAuthHeaders(false),
  });
};

export const approveSubscriptionApi = async (id) => {
  return request(`/subscriptions/approve/${id}`, {
    method: 'POST',
    headers: getAuthHeaders(false),
  });
};