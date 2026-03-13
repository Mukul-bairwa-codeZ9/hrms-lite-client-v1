import api from '../config/api.config';

const employeeService = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  remove: (id) => api.delete(`/employees/${id}`),
};

export default employeeService;