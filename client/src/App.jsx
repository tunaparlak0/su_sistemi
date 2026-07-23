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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/abonelik-basvuru" element={<Subscription />} />
        <Route path="/fatura-goruntuleme" element={<Invoices />} />
        <Route path="/admin-olustur" element={<AdminCreate />} />
        <Route path="/admin/workers" element={<AdminWorkers />} />
        <Route path="/abonelik-onay" element={<SubscriptionApproval />} />
      </Routes>
    </Router>
  );
}
export default App;