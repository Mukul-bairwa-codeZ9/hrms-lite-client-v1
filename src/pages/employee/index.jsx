import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmployees from '../../hooks/useEmployee';
import EmployeeTable from '@/components/layout/employee/employee-table';
import AddEmployeeDialog from '@/components/layout/employee/add-employee';

const Employees = () => {
  const [open, setOpen] = useState(false);
  const { employees, loading, error, addEmployee, removeEmployee } = useEmployees();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {employees.length} total employee{employees.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      <EmployeeTable
        employees={employees}
        loading={loading}
        error={error}
        onDelete={removeEmployee}
      />

      <AddEmployeeDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={async (data) => {
          const success = await addEmployee(data);
          if (success) setOpen(false);
        }}
      />
    </div>
  );
};

export default Employees;