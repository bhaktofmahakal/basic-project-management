import { useState, useEffect, useCallback } from 'react';
import { fetchProjectById } from '../services/api';

export const useProjectDetail = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchProjectById(id);
      setProject(data);
    } catch (err) {
      setError(err.message);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    project,
    loading,
    error,
    refetch: fetchData,
  };
};
