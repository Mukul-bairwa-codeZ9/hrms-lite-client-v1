import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/helper';

const AttendanceTable = ({ records = [], loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-destructive font-medium">Failed to load records</p>
          <p className="text-muted-foreground text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-border rounded-lg bg-card">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-base font-semibold text-foreground mb-1">No attendance records</h3>
        <p className="text-sm text-muted-foreground">Mark attendance to see records here</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">ID</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {records.map((record) => (
            <tr key={record?._id} className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 font-medium text-foreground">
                {record?.employee?.fullName ?? '—'}
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                  {record?.employee?.employeeId ?? '—'}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {record?.employee?.department ?? '—'}
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {formatDate(record?.date)}
              </td>
              <td className="px-6 py-4">
                <Badge
                  className={
                    record?.status === 'Present'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }
                >
                  {record?.status === 'Present' ? '✅ Present' : '❌ Absent'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;