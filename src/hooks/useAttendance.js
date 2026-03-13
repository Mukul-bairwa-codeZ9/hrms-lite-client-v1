import { useState, useCallback } from 'react';
import attendanceService from '../services/attendance.service';
import toast from 'react-hot-toast';

const useAttendance = () => {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttendance = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await attendanceService.getAll(filters);
      setRecords(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await attendanceService.getSummary();
      setSummary(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAttendance = async (data) => {
    try {
      await attendanceService.mark(data);
      toast.success('Attendance marked successfully!');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  return {
    records,
    summary,
    stats,
    loading,
    error,
    markAttendance,
    fetchAttendance,
    fetchSummary,
  };
};

export default useAttendance;