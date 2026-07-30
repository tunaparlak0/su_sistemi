import Header from '../components/Header';
import Footer from '../components/Footer';
import SubscriptionForm from '../components/SubscriptionForm';

export default function SubscriptionOperations() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header />

        <section className="max-w-4xl mx-auto pt-12 px-6 mb-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Abonelik İşlemleri
            </h1>
            <p className="text-slate-600">
              Abonelik iptal ve bilgi güncelleme taleplerinizi buradan hızlıca yönetebilirsiniz.
            </p>
          </div>

          {/* Form Bileşeni */}
          <SubscriptionForm />
        </section>
      </div>

      <Footer />
    </main>
  );
}