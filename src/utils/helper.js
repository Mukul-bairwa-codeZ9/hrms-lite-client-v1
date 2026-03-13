export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getDepartmentColor = (department) => {
  const colors = {
    Engineering: '#38bdf8',
    Design: '#a78bfa',
    Marketing: '#fb923c',
    Sales: '#4ade80',
    HR: '#f472b6',
    Finance: '#facc15',
    Operations: '#94a3b8',
    Legal: '#f87171',
    Product: '#34d399',
    Other: '#cbd5e1',
  };
  return colors[department] || '#94a3b8';
};