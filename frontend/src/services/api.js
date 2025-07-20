import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Upload file
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get files list
  getFiles: () => api.get('/files/'),

  // Get file details
  getFileDetail: (fileId) => api.get(`/files/${fileId}/`),

  // Analyze file
  analyzeDataQuality: (fileId) => api.get(`/files/${fileId}/analyze/`),

  // Clean data
  cleanData: (fileId, options = {}) => api.post(`/files/${fileId}/clean/`, { options }),

  // Preview data
  previewData: (fileId, limit = 100) => api.get(`/files/${fileId}/preview/?limit=${limit}`),

  // Export data
  exportData: (fileId, format = 'csv') => api.get(`/files/${fileId}/export/?format=${format}`, {
    responseType: 'blob',
  }),

  // Dashboard stats
  getDashboardStats: () => api.get('/dashboard/stats/'),
};

export default api;
