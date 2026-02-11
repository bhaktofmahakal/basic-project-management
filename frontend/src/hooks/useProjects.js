import { useState, useEffect, useCallback } from 'react';
import { fetchProjects } from '../services/api';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      params.sortBy = filters.sortBy;
      params.sortOrder = filters.sortOrder;
      params.page = filters.page.toString();
      params.limit = filters.limit.toString();

      const data = await fetchProjects(params);
      setProjects(data.projects);
      setPagination({
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  }, []);

  const setPage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return {
    projects,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    setPage,
    refetch: fetchData,
  };
};
