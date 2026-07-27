import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Invoices from './pages/Invoices';

// Dosya yollarının klasör yapınla birebir aynı olduğundan emin ol!
import AdminLogin from './pages/Admin/AdminLogin';
import AdminPanel from './pages/Admin/AdminPanel'; 
import AdminCreate from './pages/Admin/AdminCreate';
import SubscriptionApproval from './pages/Admin/SubscriptionApproval';
import AdminWorkers from './pages/Admin/AdminWorkers';
import InvoiceCreate from './pages/Admin/InvoiceCreate';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminLogs from './pages/Admin/AdminLogs';
import AdminMeters from './pages/Admin/AdminMeters';
import About from './pages/About';
import Payment from './pages/Payment';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/abonelik-basvuru" element={<Subscription />} />
        <Route path="/fatura-goruntuleme" element={<Invoices />} />
        <Route path="/odeme/:id" element={<Payment />} />
        <Route path="/admin-olustur" element={<AdminCreate />} />
        <Route path="/admin/workers" element={<AdminWorkers />} />
        <Route path="/abonelik-onay" element={<SubscriptionApproval />} />
        <Route path="/fatura-olustur" element={<InvoiceCreate />} />
        <Route path="/admin/meters" element={<AdminMeters />} />
      </Routes>
    </Router>
  );
}
export default App;