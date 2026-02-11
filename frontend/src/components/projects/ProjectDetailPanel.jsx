import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { updateProjectStatus } from '../../services/api';

export const ProjectDetailPanel = ({ project, onClose, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  if (!project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return 'Invalid date';
    }
  };

  const getAvailableStatuses = () => {
    const statusTransitions = {
      active: [
        { value: 'active', label: 'Active' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'completed', label: 'Completed' },
      ],
      on_hold: [
        { value: 'on_hold', label: 'On Hold' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
      ],
      completed: [
        { value: 'completed', label: 'Completed' },
      ],
    };
    return statusTransitions[project.status] || statusTransitions.active;
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === project.status) return;

    try {
      setIsUpdating(true);
      setError(null);
      await updateProjectStatus(project.id, newStatus);
      if (typeof onUpdate === 'function') {
        onUpdate();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Project Details
          </h2>
          <Button variant="ghost" icon="close" onClick={onClose} className="!p-2" />
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {project.name}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Client: {project.clientName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <Select
                options={getAvailableStatuses()}
                value={project.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={isUpdating || project.status === 'completed'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Priority
              </label>
              <div className="h-11 flex items-center">
                <span className={`capitalize font-medium ${
                  project.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                  project.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                  'text-slate-600 dark:text-slate-400'
                }`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Start Date
              </label>
              <p className="text-slate-900 dark:text-slate-100">{formatDate(project.startDate)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Due Date
              </label>
              <p className="text-slate-900 dark:text-slate-100">{formatDate(project.endDate)}</p>
            </div>
          </div>

          {project.notes && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Notes
              </label>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {project.notes}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Created:</span>
                <p className="text-slate-900 dark:text-slate-100">{formatDate(project.createdAt)}</p>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Last Updated:</span>
                <p className="text-slate-900 dark:text-slate-100">{formatDate(project.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
