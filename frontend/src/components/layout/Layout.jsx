import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = ({ children, title, searchValue, onSearchChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 h-screen overflow-hidden flex selection:bg-primary/30">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header 
          title={title} 
          onMenuClick={() => setSidebarOpen(true)}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col p-8 overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
