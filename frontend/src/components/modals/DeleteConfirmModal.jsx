import { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { deleteProject } from '../../services/api';

export const DeleteConfirmModal = ({ isOpen, project, onClose, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsDeleting(false);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await deleteProject(project.id);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err?.message || String(err) || 'Failed to delete project');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="delete-modal-title"
        className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <span className="material-icons text-red-600 dark:text-red-400 text-2xl">
                warning
              </span>
            </div>
            <div>
              <h2 id="delete-modal-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Delete Project?
              </h2>
            </div>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Are you sure you want to delete <strong className="text-slate-900 dark:text-slate-100">{project.name}</strong>?
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
            This project will be moved to trash (soft delete). This action can be reversed by an administrator.
          </p>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1"
            >
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
