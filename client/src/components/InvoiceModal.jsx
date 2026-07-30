import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InvoiceModal({ selectedInvoice, onClose }) {
  const navigate = useNavigate();

  if (!selectedInvoice) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
        >
          <X size={18} />
        </button>

        {/* Fatura Başlığı */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-blue-900 tracking-tight">TSKİ SU FATURASI</h2>
            <p className="text-xs text-slate-500">Sakarya Su ve Kanalizasyon İdaresi</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedInvoice.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {selectedInvoice.isPaid ? "ÖDENDİ" : "ÖDENMEDİ"}
            </span>
          </div>
        </div>

        {/* Abone ve Adres Bilgileri */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-sm space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Abone Ad Soyad:</span>
            <span className="font-bold text-slate-800">
              {selectedInvoice.subscription?.owners?.[0] ? `${selectedInvoice.subscription.owners[0].name} ${selectedInvoice.subscription.owners[0].surname}` : "Bilinmiyor"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Abonelik No:</span>
            <span className="font-mono text-slate-800">{selectedInvoice.subscriptionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Sayaç Numarası:</span>
            <span className="font-mono text-slate-800">{selectedInvoice.subscription?.meterId || "Belirtilmemiş"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Adres:</span>
            <span className="text-slate-800 text-right">{selectedInvoice.subscription?.meter?.address || "Adres bulunamadı"}</span>
          </div>
        </div>

        {/* Fatura Kalemleri Tablosu */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-6 text-sm">
          <div className="bg-slate-100 px-4 py-2 font-semibold text-slate-700 flex justify-between border-b">
            <span>İşlem / Tüketim Detayı</span>
            <span>Tutar</span>
          </div>
          <div className="px-4 py-3 flex justify-between border-b text-slate-600">
            <span>Su Tüketimi ({selectedInvoice.usedWater} m3 x {selectedInvoice.unitPrice} TL)</span>
            <span>{(selectedInvoice.usedWater * selectedInvoice.unitPrice).toFixed(2)} TL</span>
          </div>
          <div className="px-4 py-3 flex justify-between border-b text-slate-600">
            <span>KDV (% {selectedInvoice.taxRate * 100})</span>
            <span>{(selectedInvoice.totalPrice - (selectedInvoice.usedWater * selectedInvoice.unitPrice)).toFixed(2)} TL</span>
          </div>
          <div className="px-4 py-3 flex justify-between bg-blue-50/50 font-bold text-slate-900 text-base">
            <span>Genel Toplam:</span>
            <span className="text-blue-600">{selectedInvoice.totalPrice} TL</span>
          </div>
        </div>

        {/* Tarih Bilgileri */}
        <div className="flex justify-between text-xs text-slate-500 mb-6 px-1">
          <span>Kesim Tarihi: {new Date(selectedInvoice.invoiceDate).toLocaleDateString('tr-TR')}</span>
          <span>Son Ödeme: {new Date(selectedInvoice.dueDate).toLocaleDateString('tr-TR')}</span>
        </div>

        {/* Butonlar */}
        <div className="flex gap-3">
          {!selectedInvoice.isPaid ? (
            <button
              onClick={() => {
                onClose();
                navigate(`/odeme/${selectedInvoice.id}`);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Ödeme Sayfasına Git
            </button>
          ) : (
            <div className="w-full text-center py-3 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200">
              Bu Fatura Ödenmiştir ✓
            </div>
          )}
          <button
            onClick={onClose}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}