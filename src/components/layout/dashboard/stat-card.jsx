import { cn } from '@/lib/utils';

const StatCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
  const colors = {
    primary: 'text-primary bg-primary/10',
    green: 'text-green-400 bg-green-500/10',
    red: 'text-red-400 bg-red-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {Icon && (
          <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', colors[color])}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
};

export default StatCard;