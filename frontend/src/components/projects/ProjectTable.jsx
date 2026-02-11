import { format } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { Button } from '../common/Button';

export const ProjectTable = ({ projects = [], onProjectClick, onDelete }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return '-';
    }
  };

  return (
    <div className="card flex-1 overflow-hidden flex flex-col">
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display border-b border-slate-200 dark:border-slate-700">
                Project Name
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display border-b border-slate-200 dark:border-slate-700">
                Client
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display border-b border-slate-200 dark:border-slate-700">
                Status
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display border-b border-slate-200 dark:border-slate-700">
                Due Date
              </th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display border-b border-slate-200 dark:border-slate-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {safeProjects.map((project, index) => (
              <tr
                key={project.id}
                role="button"
                tabIndex={0}
                className={`
                  group hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors
                  ${index === 0 ? 'bg-zebra-stripe dark:bg-white/5 border-l-4 border-l-primary' : ''}
                `}
                onClick={() => onProjectClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onProjectClick(project);
                  }
                }}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-primary/20 text-primary flex items-center justify-center">
                      <span className="material-icons text-sm">web</span>
                    </div>
                    <div>
                      <p className="font-display font-medium text-slate-900 dark:text-white">{project.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 md:hidden">{project.clientName}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 italic">Click for details</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      {project.clientName?.charAt(0) || '?'}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{project.clientName || 'Unknown'}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={project.status} />
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">{formatDate(project.endDate)}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Button
                    variant="ghost"
                    icon="delete"
                    aria-label={`Delete ${project.name || 'project'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(project);
                    }}
                    className="!p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 transition-opacity"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
