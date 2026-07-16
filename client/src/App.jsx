// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Invoices from './pages/Invoices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abonelik-basvuru" element={<Subscription />} />
        <Route path="/fatura-goruntuleme" element={<Invoices />} />
      </Routes>
    </Router>
  );
}
export default App;