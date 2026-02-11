export const Input = ({ 
  label, 
  error, 
  icon,
  className = '',
  ...props 
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            {icon}
          </span>
        )}
        <input
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
