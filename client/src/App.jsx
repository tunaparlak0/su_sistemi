import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Invoices from './pages/Invoices';
import SubscriptionOperations from './pages/SubscriptionOperations';
import About from './pages/About';
import Payment from './pages/Payment';

// Admin Sayfaları
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel'; 
import AdminCreate from './pages/Admin/AdminCreate';
import SubscriptionApproval from './pages/Admin/SubscriptionApproval';
import AdminWorkers from './pages/Admin/AdminWorkers';
import InvoiceCreate from './pages/Admin/InvoiceCreate';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminLogs from './pages/Admin/AdminLogs';
import AdminMeters from './pages/Admin/AdminMeters';

// Korumalı Rota Bileşeni
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Herkese Açık Sayfalar */}
        <Route path="/" element={<Home />} />
        <Route path="/abonelik-islemleri" element={<SubscriptionOperations />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/abonelik-basvuru" element={<Subscription />} />
        <Route path="/fatura-goruntuleme" element={<Invoices />} />
        <Route path="/odeme/:id" element={<Payment />} />

        {/* 🔒 Korumalı Admin Sayfaları (Sadece Token Varsa Girilebilir) */}
        <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><AdminLogs /></ProtectedRoute>} />
        <Route path="/admin-olustur" element={<ProtectedRoute><AdminCreate /></ProtectedRoute>} />
        <Route path="/admin/workers" element={<ProtectedRoute><AdminWorkers /></ProtectedRoute>} />
        <Route path="/abonelik-onay" element={<ProtectedRoute><SubscriptionApproval /></ProtectedRoute>} />
        <Route path="/fatura-olustur" element={<ProtectedRoute><InvoiceCreate /></ProtectedRoute>} />
        <Route path="/admin/meters" element={<ProtectedRoute><AdminMeters /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;