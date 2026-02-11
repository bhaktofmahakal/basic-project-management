import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '#', label: 'Team View', icon: 'people' },
    { path: '#', label: 'Reports', icon: 'bar_chart' },
    { path: '#', label: 'Calendar', icon: 'calendar_today' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-sidebar-bg flex flex-col h-full transition-transform duration-300 flex-shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(29,211,65,0.4)]">
              P
            </div>
            <span className="text-white font-display font-semibold text-lg tracking-tight">
              ProjectFlow
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path) && item.path !== '#';
            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
                  ${isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
                onClick={item.path !== '#' ? onClose : undefined}
              >
                <span className={`material-icons text-[20px] ${!isActive && 'group-hover:text-white'} transition-colors`}>{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="material-icons text-[20px]">settings</span>
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <div className="mt-4 flex items-center gap-3 px-3">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold text-sm">
                UM
              </div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-sidebar-bg"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Utsav Mishra</p>
              <p className="text-xs text-slate-400 truncate">Product Lead</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
