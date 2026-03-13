import api from '@/config/api.config';

const attendanceService = {
  mark: (data) => api.post('/attendance', data),
  getAll: (params) => api.get('/attendance', { params }),
  getSummary: () => api.get('/attendance/summary'),
};

export default attendanceService;