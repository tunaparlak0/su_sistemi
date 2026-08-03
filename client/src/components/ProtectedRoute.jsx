import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  // Eğer token yoksa, kullanıcıyı giriş sayfasına yönlendir
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  // Eğer token varsa, istenen sayfayı (children) göster
  return children;
}