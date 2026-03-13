import { useState, useEffect } from 'react';
import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAttendance from '@/hooks/useAttendance';
import useEmployees from '@/hooks/useEmployee';
import AttendanceTable from '@/components/layout/attendance/attendance-table';
import AttendanceFilters from '@/components/layout/attendance/attendance-filters';
import MarkAttendanceDialog from '@/components/layout/attendance/add-attendance';

const initialFilters = { employeeId: '', startDate: '', endDate: '' };

const Attendance = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const { employees = [] } = useEmployees();
  const { records = [], loading, error, markAttendance, fetchAttendance } = useAttendance();

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const active = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    fetchAttendance(active);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    fetchAttendance();
  };

  const handleMark = async (data) => {
    const success = await markAttendance(data);
    if (success) {
      setOpen(false);
      fetchAttendance();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {records.length} record{records.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <CalendarPlus className="w-4 h-4" />
          Mark Attendance
        </Button>
      </div>

      <AttendanceFilters
        employees={employees}
        filters={filters}
        onChange={handleFilterChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <AttendanceTable
        records={records}
        loading={loading}
        error={error}
      />

      <MarkAttendanceDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleMark}
        employees={employees}
      />
    </div>
  );
};

export default Attendance;