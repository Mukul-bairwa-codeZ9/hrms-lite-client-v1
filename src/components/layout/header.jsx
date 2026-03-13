const Header = ({ title, subtitle }) => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center px-6">
      <div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Header;