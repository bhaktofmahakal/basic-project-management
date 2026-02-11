import { Button } from '../common/Button';

export const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="card p-6 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <span className="material-icons text-red-600 dark:text-red-400 text-3xl">error</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-1">
            Something went wrong
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            {error || 'An unexpected error occurred. Please try again.'}
          </p>
          {onRetry && (
            <Button variant="secondary" icon="refresh" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
