export default function CustomInput({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  maxLength, 
  required = false,
  className = "" 
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        maxLength={maxLength}
        required={required}
        className={`px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-slate-800 bg-slate-50 ${className}`}
      />
    </div>
  );
}