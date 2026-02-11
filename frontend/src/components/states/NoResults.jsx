import { Button } from '../common/Button';

export const NoResults = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span className="material-icons text-5xl text-slate-400">filter_alt_off</span>
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
        No Projects Found
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 text-center max-w-md">
        No projects match your current filters. Try adjusting your search or filter criteria.
      </p>
      <Button variant="secondary" icon="clear" onClick={onClearFilters}>
        Clear All Filters
      </Button>
    </div>
  );
};
