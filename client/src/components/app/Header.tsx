interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Header({ children, ...props }: HeaderProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={`py-4 border-b-1 dark:border-neutral-800 border-neutral-200 ${
        className ?? ""
      }`}
      {...rest}
    >
      <div className="app-container flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}
export default Header;
