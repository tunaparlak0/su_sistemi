// client/src/pages/Home.jsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="z-10 max-w-5xl w-full text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-8">
          Su Yönetim Sistemi
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Abonelik işlemlerinizi ve faturalarınızı kolayca yönetin.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/abonelik-basvuru'}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
          >
            Abonelik Başvurusu
          </button>
          
          <button 
            onClick={() => window.location.href = '/fatura-goruntuleme'}
            className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
          >
            Fatura Görüntüleme
          </button>
        </div>
      </div>
    </main>
  );
}