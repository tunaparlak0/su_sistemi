import CustomInput from './CustomInput';

export default function InvoiceForm({ subscriptionId, setSubscriptionId, usedWater, setUsedWater, onSubmit }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        
        <CustomInput 
          label="Abonelik Numarası:"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(e.target.value)}
          placeholder="Örn: 1000002"
          required
        />

        <CustomInput 
          label="Harcanan Su Miktarı (m3):"
          type="number"
          value={usedWater}
          onChange={(e) => setUsedWater(e.target.value)}
          placeholder="Örn: 25"
          required
        />

        <button 
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-sm"
        >
          Fatura Hesapla ve Kes
        </button>

      </form>
    </div>
  );
}