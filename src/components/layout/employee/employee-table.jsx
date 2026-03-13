import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, getInitials, getDepartmentColor } from '../../../utils/helper';

const EmployeeTable = ({ employees, loading, error, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

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
          <p className="text-destructive font-medium">Failed to load employees</p>
          <p className="text-muted-foreground text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-border rounded-lg bg-card">
        <div className="text-5xl mb-4">👥</div>
        <h3 className="text-base font-semibold text-foreground mb-1">No employees yet</h3>
        <p className="text-sm text-muted-foreground">Click "Add Employee" to get started</p>
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
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Joined</th>
            <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
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
              <td className="px-6 py-4">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                  {emp.employeeId}
                </span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{emp.email}</td>
              <td className="px-6 py-4">
                <Badge
                  style={{
                    backgroundColor: getDepartmentColor(emp.department) + '22',
                    color: getDepartmentColor(emp.department),
                    borderColor: getDepartmentColor(emp.department) + '44',
                  }}
                >
                  {emp.department}
                </Badge>
              </td>
              <td className="px-6 py-4 text-muted-foreground">
                {formatDate(emp.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(emp._id)}
                  disabled={deletingId === emp._id}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  {deletingId === emp._id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Trash2 className="w-4 h-4" />
                  }
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;