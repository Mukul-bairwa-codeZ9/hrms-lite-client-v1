import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTodayDate } from '@/utils/helper';

const AttendanceFilters = ({ 
  employees = [], 
  filters = { employeeId: '', startDate: '', endDate: '' }, 
  onChange, 
  onApply, 
  onReset 
}) => {
  return (
    <div className="flex flex-wrap gap-3 p-4 bg-card border border-border rounded-lg">

      <Select
        value={filters.employeeId || 'all'}
        onValueChange={(val) => onChange('employeeId', val === 'all' ? '' : val)}
      >
        <SelectTrigger className="bg-card border-input text-foreground min-w-[180px]">
          <SelectValue placeholder="All Employees" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="all" className="text-foreground">All Employees</SelectItem>
          {Array.isArray(employees) && employees.map((emp) => (
            emp?._id ? (
              <SelectItem key={emp._id} value={emp._id} className="text-foreground">
                {emp?.fullName ?? 'Unknown'} ({emp?.employeeId ?? '—'})
              </SelectItem>
            ) : null
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.startDate || ''}
        onChange={(e) => onChange('startDate', e.target.value)}
        style={{ colorScheme: 'dark' }}
        className="w-auto"
      />

      <Input
        type="date"
        value={filters.endDate || ''}
        max={getTodayDate()}
        onChange={(e) => onChange('endDate', e.target.value)}
        style={{ colorScheme: 'dark' }}
        className="w-auto"
      />

      <Button onClick={onApply} size="sm">Apply</Button>
      <Button onClick={onReset} variant="outline" size="sm">Reset</Button>
    </div>
  );
};

export default AttendanceFilters;