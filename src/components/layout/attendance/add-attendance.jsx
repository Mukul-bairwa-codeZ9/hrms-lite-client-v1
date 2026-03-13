import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getTodayDate } from '@/utils/helper';
import { ATTENDANCE_STATUS } from '@/constants/index';

const initialForm = {
  employeeId: '',
  date: getTodayDate(),
  status: ATTENDANCE_STATUS.PRESENT,
};

const MarkAttendanceDialog = ({ open, onClose, onSubmit, employees = [] }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ ...initialForm, date: getTodayDate() });
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const errs = {};
    if (!form.employeeId) errs.employeeId = 'Please select an employee';
    if (!form.date) errs.date = 'Date is required';
    if (!form.status) errs.status = 'Status is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Mark Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">

          {/* Employee */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Employee
            </label>
            <Select
              value={form.employeeId || ''}
              onValueChange={(val) => {
                setForm((prev) => ({ ...prev, employeeId: val }));
                setErrors((prev) => ({ ...prev, employeeId: '' }));
              }}
            >
              <SelectTrigger className="bg-card border-input text-foreground">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {Array.isArray(employees) && employees.map((emp) => (
                  emp?._id ? (
                    <SelectItem key={emp._id} value={emp._id} className="text-foreground">
                      {emp?.fullName ?? 'Unknown'} ({emp?.employeeId ?? '—'})
                    </SelectItem>
                  ) : null
                ))}
              </SelectContent>
            </Select>
            {errors.employeeId && <p className="text-xs text-destructive">{errors.employeeId}</p>}
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Date
            </label>
            <Input
              type="date"
              value={form.date || ''}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, date: e.target.value }));
                setErrors((prev) => ({ ...prev, date: '' }));
              }}
              style={{ colorScheme: 'dark' }}
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
          </div>

          {/* Status Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </label>
            <div className="flex gap-3">
              {Object.values(ATTENDANCE_STATUS).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, status }))}
                  className={`flex-1 py-2 rounded-md text-sm font-medium border transition-all ${
                    form.status === status
                      ? status === 'Present'
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-destructive/20 border-destructive text-destructive'
                      : 'border-input text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {status === 'Present' ? '✅' : '❌'} {status}
                </button>
              ))}
            </div>
            {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : 'Mark Attendance'}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceDialog;