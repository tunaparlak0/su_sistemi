import { useNavigate } from 'react-router-dom';

export function MenuHomeButton({ url, title, description, icon }) {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(url)}
      className="flex items-center gap-6 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all text-left"
    >
      <div className="p-4 bg-blue-50 rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </button>
  );
}