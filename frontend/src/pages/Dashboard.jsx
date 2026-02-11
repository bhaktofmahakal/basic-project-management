import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ProjectTable } from '../components/projects/ProjectTable';
import { ProjectDetailPanel } from '../components/projects/ProjectDetailPanel';
import { CreateProjectModal } from '../components/modals/CreateProjectModal';
import { DeleteConfirmModal } from '../components/modals/DeleteConfirmModal';
import { LoadingSkeleton } from '../components/states/LoadingSkeleton';
import { EmptyState } from '../components/states/EmptyState';
import { ErrorState } from '../components/states/ErrorState';
import { NoResults } from '../components/states/NoResults';
import { Button } from '../components/common/Button';
import { useProjects } from '../hooks/useProjects';
import { useDebounce } from '../hooks/useDebounce';

export const Dashboard = () => {
  const { projects, loading, error, filters, pagination, updateFilters, setPage, refetch } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    updateFilters({ search: debouncedSearch });
  }, [debouncedSearch, updateFilters]);

  const hasActiveFilters = filters.status || filters.search;
  const isEmpty = projects.length === 0 && !hasActiveFilters && !loading && !error;
  const isNoResults = projects.length === 0 && hasActiveFilters && !loading && !error;

  const handleClearFilters = () => {
    setSearchInput('');
    updateFilters({ status: '', search: '' });
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleDeleteSuccess = () => {
    refetch();
    setProjectToDelete(null);
    setSelectedProject(null);
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing {projects.length} of {pagination.total} projects
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage(filters.page - 1)}
            disabled={filters.page === 1}
          >
            Previous
          </Button>
          <div className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
            Page {filters.page} of {pagination.totalPages}
          </div>
          <Button
            variant="secondary"
            onClick={() => setPage(filters.page + 1)}
            disabled={filters.page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout 
      title="Project Dashboard"
      searchValue={searchInput}
      onSearchChange={setSearchInput}
    >
      <ProjectFilters
        filters={filters}
        onFilterChange={updateFilters}
        onCreateClick={() => setIsCreateModalOpen(true)}
      />

      {loading && <LoadingSkeleton type="table" />}

      {error && <ErrorState error={error} onRetry={refetch} />}

      {isEmpty && <EmptyState onCreateClick={() => setIsCreateModalOpen(true)} />}

      {isNoResults && <NoResults onClearFilters={handleClearFilters} />}

      {!loading && !error && projects.length > 0 && (
        <>
          <ProjectTable
            projects={projects}
            onProjectClick={handleProjectClick}
            onDelete={setProjectToDelete}
          />
          {renderPagination()}
        </>
      )}

      {selectedProject && (
        <ProjectDetailPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdate={() => {
            refetch();
            setSelectedProject(null);
          }}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={refetch}
      />

      <DeleteConfirmModal
        isOpen={!!projectToDelete}
        project={projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onSuccess={handleDeleteSuccess}
      />
    </Layout>
  );
};
