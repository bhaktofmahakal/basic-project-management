import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Button } from '../common/Button';

export const ProjectCard = ({ project, onClick, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return '-';
    }
  };

  return (
    <div
      className="card p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {project.clientName}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-1">Click for details</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Priority:</span>
          <span className={`capitalize font-medium ${
            project.priority === 'high' ? 'text-red-600 dark:text-red-400' :
            project.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
            'text-slate-600 dark:text-slate-400'
          }`}>
            {project.priority}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Start:</span>
          <span className="text-slate-800 dark:text-slate-200">{formatDate(project.startDate)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Due:</span>
          <span className="text-slate-800 dark:text-slate-200">{formatDate(project.endDate)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="danger"
          icon="delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project);
          }}
          className="w-full"
        >
          Delete Project
        </Button>
      </div>
    </div>
  );
};
