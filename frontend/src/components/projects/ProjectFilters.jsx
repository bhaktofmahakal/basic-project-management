export const ProjectFilters = ({ filters, onFilterChange, onCreateClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <select 
            aria-label="Filter by project status"
            className="appearance-none bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2 pl-3 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm hover:border-slate-300 transition-colors"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
          <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
        </div>
        
        <div className="relative hidden md:block">
          <select 
            aria-label="Sort projects by"
            className="appearance-none bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2 pl-3 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-sm hover:border-slate-300 transition-colors"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          >
            <option value="createdAt">Created Date</option>
            <option value="startDate">Start Date</option>
          </select>
          <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">expand_more</span>
        </div>
      </div>
      
      <button 
        onClick={onCreateClick}
        className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-[0_4px_14px_rgba(29,211,65,0.3)] hover:shadow-[0_6px_20px_rgba(29,211,65,0.4)] transition-all flex items-center gap-2 transform active:scale-95"
      >
        <span className="material-icons text-lg">add</span>
        New Project
      </button>
    </div>
  );
};
