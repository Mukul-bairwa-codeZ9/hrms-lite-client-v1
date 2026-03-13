import { useState, useEffect, useCallback } from 'react';
import employeeService from '../services/employee.service';
import toast from 'react-hot-toast';

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.getAll();
      setEmployees(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addEmployee = async (data) => {
    try {
      await employeeService.create(data);
      toast.success('Employee added successfully!');
      await fetchEmployees();
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const removeEmployee = async (id) => {
    try {
      await employeeService.remove(id);
      toast.success('Employee deleted successfully!');
      await fetchEmployees();
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    addEmployee,
    removeEmployee,
    refetch: fetchEmployees,
  };
};

export default useEmployees;