export const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: {
      label: 'In Progress',
      classes: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
    },
    on_hold: {
      label: 'On Hold',
      classes: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
    },
    completed: {
      label: 'Completed',
      classes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    },
  };

  const config = statusConfig[status] || statusConfig.active;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
};
