import { getInitials, getDepartmentColor } from '@/utils/helper';

const AttendanceSummaryTable = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-sm text-muted-foreground">No attendance data yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee</th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Present Days</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((emp, i) => (
            <tr key={i} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      backgroundColor: getDepartmentColor(emp.department),
                      color: '#0f172a',
                    }}
                  >
                    {getInitials(emp.fullName)}
                  </div>
                  <span className="font-medium text-foreground">{emp.fullName}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{emp.department}</td>
              <td className="py-3 px-4 text-right">
                <span className="font-bold text-green-400">{emp.presentDays}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSummaryTable;