import { Button } from '../common/Button';
import { ToggleTheme } from '../common/ToggleTheme';

export const Header = ({ title, onMenuClick, searchValue, onSearchChange }) => {
  return (
    <header className="bg-surface-light dark:bg-surface-dark h-16 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 flex-shrink-0 z-10">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          icon="menu"
          onClick={onMenuClick}
          className="lg:hidden"
        />
        <h1 className="text-xl font-display font-semibold text-slate-800 dark:text-white">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64 group hidden md:block">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">search</span>
          <input 
            aria-label="Search projects or clients"
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all" 
            placeholder="Search projects or clients..." 
            type="text"
            value={searchValue || ''}
            onChange={(e) => {
              if (typeof onSearchChange === 'function') {
                onSearchChange(e.target.value);
              }
            }}
          />
        </div>
        
        <ToggleTheme animationType="wave-ripple" duration={600} />
        
        <button 
          aria-label="View notifications"
          className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-icons">notifications_none</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark"></span>
        </button>
      </div>
    </header>
  );
};
