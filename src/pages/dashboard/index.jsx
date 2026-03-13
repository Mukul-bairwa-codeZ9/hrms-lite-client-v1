import { useEffect } from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import useAttendance from '@/hooks/useAttendance';
import useEmployees from '@/hooks/useEmployee';
import StatCard from '@/components/layout/dashboard/stat-card';
import AttendanceSummaryTable from '@/components/layout/dashboard/summary-table';

const Dashboard = () => {
  const { employees = [] } = useEmployees();
  const { summary, fetchSummary, loading } = useAttendance();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Today's overview — {new Date().toLocaleDateString('en-IN', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={summary?.totalEmployees ?? employees.length}
          subtitle="Registered in system"
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Present Today"
          value={summary?.presentToday ?? 0}
          subtitle="Marked present today"
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Absent Today"
          value={summary?.absentToday ?? 0}
          subtitle="Marked absent today"
          icon={UserX}
          color="red"
        />
        <StatCard
          title="Not Marked"
          value={summary?.notMarkedToday ?? 0}
          subtitle="Attendance pending"
          icon={Clock}
          color="amber"
        />
      </div>

      {/* Attendance Summary Table */}
      <div className="rounded-lg border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h2 className="text-base font-semibold text-foreground">Employee Attendance Summary</h2>
          <p className="text-xs text-muted-foreground mt-1">Total present days per employee</p>
        </div>
        <div className="p-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <AttendanceSummaryTable data={summary?.perEmployee ?? []} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;