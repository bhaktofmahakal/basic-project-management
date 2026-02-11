import React, { useId } from 'react';

export const Select = ({ 
  label, 
  options = [], 
  error, 
  className = '',
  id: propsId,
  ...props 
}) => {
  const generatedId = useId();
  const id = propsId || generatedId;

  return (
    <div className={`${className}`}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
