import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DEPARTMENTS } from '../../../constants/index';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const initialForm = {
  employeeId: '',
  fullName: '',
  email: '',
  department: '',
};

const AddEmployeeDialog = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.employeeId.trim()) errs.employeeId = 'Employee ID is required';
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.department) errs.department = 'Department is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setForm(initialForm);
    setErrors({});
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Employee ID
            </label>
            <Input
              name="employeeId"
              placeholder="e.g. EMP001"
              value={form.employeeId}
              onChange={handleChange}
              className={errors.employeeId ? 'border-destructive' : ''}
            />
            {errors.employeeId && <p className="text-xs text-destructive">{errors.employeeId}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Full Name
            </label>
            <Input
              name="fullName"
              placeholder="e.g. John Doe"
              value={form.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Email Address
            </label>
            <Input
              name="email"
              type="email"
              placeholder="e.g. john@company.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
                style={{ backgroundColor: 'hsl(var(--card))', colorScheme: 'dark' }}
              className={`w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all cursor-pointer ${
                errors.department ? 'border-destructive' : 'border-input'
              }`}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;