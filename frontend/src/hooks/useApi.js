import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      const response = await apiService.uploadFile(file, setProgress);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'upload');
      throw err;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadFile, uploading, progress, error };
};

export const useDataCleaning = () => {
  const [cleaning, setCleaning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const cleanData = async (fileId, options) => {
    try {
      setCleaning(true);
      setError(null);
      setProgress(0);

      const response = await apiService.cleanData(fileId, options);
      const taskId = response.data.task_id;

      // Polling pour suivre le progrès
      const pollStatus = async () => {
        try {
          const statusResponse = await apiService.getCleaningStatus(taskId);
          const { status, progress: taskProgress } = statusResponse.data;
          
          setProgress(taskProgress || 0);

          if (status === 'completed') {
            setCleaning(false);
            return statusResponse.data;
          } else if (status === 'failed') {
            throw new Error('Le nettoyage a échoué');
          } else {
            setTimeout(pollStatus, 1000);
          }
        } catch (err) {
          setError(err.message);
          setCleaning(false);
        }
      };

      setTimeout(pollStatus, 1000);
      return { task_id: taskId };
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du nettoyage');
      setCleaning(false);
      throw err;
    }
  };

  return { cleanData, cleaning, progress, error };
};